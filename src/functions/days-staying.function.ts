import { IAttendee } from "@/types";
import { dayName } from "./day-name.function";
import { TZ_OFFSET } from "@/definitions";

export const daysStaying = (
  dates: Pick<IAttendee<Date>, "arrival" | "departure">,
  includeDuration: boolean = true,
): string => {
  if (!includeDuration) {
    return `${dayName(dates.arrival)} to ${dayName(dates.departure)}`;
  }
  const totalDays = Math.round((+dates.departure - +dates.arrival - TZ_OFFSET) / 86_400_000);
  return `🛌 ${totalDays} ${totalDays === 1 ? 'night' : 'nights'}, ${dayName(+dates.arrival - TZ_OFFSET)} to ${dayName(dates.departure)}`;
};
