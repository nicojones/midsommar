export const dayName = (date: Date | string | number, day?: Intl.DateTimeFormatOptions["day"]): string =>
  new Date(date).toLocaleDateString("en-GB", { weekday: 'long', day });
