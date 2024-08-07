import { TZ_OFFSET } from "@/definitions";
import { IAttendee, IStats, IStatsAttendee, IStatsPerDay } from "@/types";

export const addDatesToAttendee = (attendee: IAttendee<string>): IAttendee<Date> => ({
  ...attendee,
  editedOn: new Date(attendee.editedOn),
  addedOn: new Date(attendee.addedOn),
  arrival: new Date(+new Date(attendee.arrival) + TZ_OFFSET),
  departure: new Date(attendee.departure),
});


export const isoDatesToAttendee = (attendee: IAttendee<Date>): IAttendee<string> => ({
  ...attendee,
  editedOn: attendee.editedOn.toISOString(),
  addedOn: attendee.addedOn.toISOString(),
  arrival: new Date(+attendee.arrival - TZ_OFFSET).toISOString(),
  departure: attendee.departure.toISOString(),
});


// @ts-expect-error function is correct
export const addDatesToStatsAttendee: ((a: IStatsAttendee<string>) => IStatsAttendee<Date>) = addDatesToAttendee;


export const addDatesToStats = (stats: IStats<string>): IStats<Date> => {
  const perDay: Record<string, IStatsPerDay<Date>> = {};
  Object.keys(stats.perDay).forEach(k => {
    perDay[k] = {
      ...stats.perDay[k],
      people: stats.perDay[k].people?.map(addDatesToStatsAttendee) ?? [],
    };
  });
  return ({
    ...stats,
    people: stats.people?.map(addDatesToStatsAttendee) ?? [],
    perDay,
  });
};
