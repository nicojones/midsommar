export interface IAttendee<TheTypeOfDateObjectReturnedFromFirebase extends string | Date = Date> {
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
   * The date when they arrive (YYYY-MM-DD String)
   */
  arrival: TheTypeOfDateObjectReturnedFromFirebase;
  /**
   * The date when they leave (YYYY-MM-DD String)
   */
  departure: TheTypeOfDateObjectReturnedFromFirebase;
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
   * Whether they are attending or not. An atendee might have signed up and later cancel it.
   */
  attending: boolean;
  /**
   * When did they signed up for the event (ISO String)
   */
  addedOn: TheTypeOfDateObjectReturnedFromFirebase;
  /**
   * When did they last edit their data (ISO String)
   */
  editedOn: TheTypeOfDateObjectReturnedFromFirebase;
  /**
   * Comments
   */
  comments: string;
  /**
   * Must be checked to verify nobody brings meat
   */
  iWillBringNoDeadAnimals: boolean;
}