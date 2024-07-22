export const dayName = (date: Date): string =>
  date.toLocaleDateString("en-GB", { weekday: 'long' });
