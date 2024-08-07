export interface IAttendee<DateType extends string | Date = Date> {
  uid: string;
  /**
   * Full name of the person
   */
  name: string;
  /**
   * Email of the person
   */
  email: string;
  /**
   * Phone number of the person. Needed to write them on whatsapp and stuff like that
   */
  phone: string;
  /**
   * The date when they arrive (YYYY-MM-DD String)
   */
  arrival: DateType;
  /**
   * The date when they leave (YYYY-MM-DD String)
   */
  departure: DateType;
  /**
   * When did they signed up for the event (ISO String)
   */
  addedOn: DateType;
  /**
   * When did they last edit their data (ISO String)
   */
  editedOn: DateType;
  /**
   * True if they own and bring a car
   */
  hasCar: boolean;
  /**
   * Number of free seats, if they come by car.
   * If two people come together in a 5-seat car, they should report 3 + 0 free seats.
   * Helpful to know if we need more cars in case we want to go anywhere.
   */
  freeCarSeats: number;
  /**
   * True if they own and bring a tent to sleep in
   */
  hasTent: boolean;
  /**
   * True if they are willing to sleep in a tent
   */
  sleepsInTent: boolean;
  /**
   * Whether they are attending or not. An attendee might have signed up and later cancel it.
   */
  attending: boolean;
  /**
   * Food that they can't or don't want to eat
   */
  problematicFoods: string[];
  /**
   * Which tasks would they like to help with?
   */
  taskHelp: string[];
  /**
   * Comments
   */
  comments: string;
  /**
   * Must be checked to verify nobody brings meat
   */
  iWillBringNoDeadAnimals: boolean;
  /**
   * If the suggested dates are bad, they will chose other dates. {@link betterDates}
   */
  badDates: boolean;
  /**
   * The other dates
   */
  betterDates: string[];
}
