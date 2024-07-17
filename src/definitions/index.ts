export * from "./storage-keys.definition";
export * from "./store.definition";


export const APP_PASSWORD = "swedishsummer";
export const RIPPLES_ENABLED = true;

export const TZ_OFFSET = 60000 * new Date().getTimezoneOffset();

// TODO -- check all these dates below
export const EARLIEST_POSSIBLE_DATE = new Date(+new Date("2025-06-15") + TZ_OFFSET);
export const EXPECTED_ARRIVAL_DATE = new Date(+new Date("2025-06-18") + TZ_OFFSET);

export const MIDSOMMAR_DATE = new Date(+new Date("2025-06-20") + TZ_OFFSET);

export const EXPECTED_DEPARTURE_DATE = new Date(+new Date("2025-06-21") + TZ_OFFSET);
export const LATEST_POSSIBLE_DATE = new Date(+new Date("2025-06-22"));
