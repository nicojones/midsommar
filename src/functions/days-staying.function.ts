import { IAttendee } from "@/types";
import { dayName } from "./day-name.function";

export const daysStaying = (dates: Pick<IAttendee<Date>, "arrival" | "departure">): string => {
  const totalDays = Math.round((+dates.departure - +dates.arrival) / 86_400_000);
  console.log(dates.departure, dates.arrival);
  return `🛌 ${totalDays} ${totalDays === 1 ? 'night' : 'nights'}, ${dayName(dates.arrival)} to ${dayName(dates.departure)}`;
};
