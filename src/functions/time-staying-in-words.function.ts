import { IAtendee } from "@/types";

export const timeStayingInWords = (dates: Pick<IAtendee<Date>, "arrival" | "departure">): string => {
  const totalDays = Math.round((+dates.departure - +dates.arrival) / 86_400_000);
  return `${totalDays} ${totalDays === 1 ? 'night' : 'nights'}, from ${dates.arrival.toDateString()} until ${dates.departure.toDateString()}`;
};
