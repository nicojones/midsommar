import { IAttendee } from "./attendee.type";

export interface IStatsAttendeeArrival {
  arriving?: boolean;
  departing?: boolean;
}

export type IStatsAttendee<DateType extends string | Date = Date> =
  Pick<IAttendee<DateType>, "name" | "email" | "addedOn" | "editedOn" | "arrival" | "departure" | "freeCarSeats" | "attending" | "hasCar" | "hasTent" | "sleepsInTent" | "problematicFoods" | "taskHelp" | "phone"> & { uid: string; }
  &
  IStatsAttendeeArrival;

export interface IStatsPerDay<DateType extends string | Date = Date> {
  /**
   * How many people are attending
   * @readonly
   */
  attending: number;
  /**
   * How many people have a car
   * @readonly
   */
  amountHaveCar: number;
  /**
   * Total free seats. This is calculated as the total number of {@link IAttendee["freeCarSeats"]} - amount of attendees that do not have a car
   */
  freeCarSeats: number;
  /**
   * How many people COULD bring their own tent.
   * @readonly
   */
  amountHaveTent: number;
  /**
   * How many people WHO HAVE A TENT are willing to sleep in it
   * @readonly
   */
  amountSleepInTent: number;
  /**
   * Average duration in days (float) that people stay
   * @readonly
   */
  averageDuration: number;
  /**
   * Summarized data of the people who come
   * @readonly
   */
  people: IStatsAttendee<DateType>[];
  /**
   * The problematic foods (summarized)
   */
  problematicFoods: Record<string, number>;
  /**
   * The task separation (summarized)
   */
  taskHelp: Record<string, number>;
}

export interface IDailyStats<DateType extends string | Date = Date> {
  day: string;
  stats: IStatsPerDay<DateType>;
}


/**
 * The values are updated via a cloud function.
 */
export interface IStats<DateType extends string | Date = Date> extends IStatsPerDay<DateType> {

  /**
   * Same stats, but per day
   */
  perDay: Record<string, IStatsPerDay<DateType>>;
}
