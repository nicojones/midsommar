import { IAtendee } from "./atendee.type";

export type IStatsAtendee = Pick<IAtendee, "name" | "email" | "arrival" | "departure" | "freeCarSeats" | "attending" | "hasCar" | "hasTent"> & { uid: string; };

/**
 * The values are updated via a cloud function.
 */
export interface IStats {
  /**
   * How many people are attending
   * @readonly
   */
  attending: number;
  /**
   * How many people have a car
   * @readonly
   */
  hasCar: number;
  /**
   * Total free seats. This is calculated as the total number of {@link IAtendee["freeCarSeats"]} - amount of atendees that do not have a car
   */
  freeCarSeats: number;
  /**
   * How many people bring their own tent
   * @readonly
   */
  hasTent: number;
  /**
   * Average duration in days (float) that people stay
   * @readonly
   */
  averageDuration: number;
  /**
   * Summarized data of the people who come
   * @readonly
   */
  people: IStatsAtendee[];

}
