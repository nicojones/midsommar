import { TZ_OFFSET } from "@/definitions";
import { IAttendee } from "@/types";

export const addDatesToAtendee = (atendee: IAttendee<string>): IAttendee<Date> => ({
  ...atendee,
  editedOn: new Date(atendee.editedOn),
  addedOn: new Date(atendee.addedOn),
  arrival: new Date(atendee.arrival),
  departure: new Date(atendee.departure),
});


export const isoDatesToAtendee = (atendee: IAttendee<Date>): IAttendee<string> => ({
  ...atendee,
  editedOn: atendee.editedOn.toISOString(),
  addedOn: atendee.addedOn.toISOString(),
  arrival: new Date(+atendee.arrival - TZ_OFFSET).toISOString(),
  departure: atendee.departure.toISOString(),
});
