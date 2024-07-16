export * from "./storage-keys.definition";
export * from "./store.definition";


export const APP_PASSWORD = "swedishsummer";

const tzOffset = new Date().getTimezoneOffset();

// TODO -- check all these dates below
export const EARLIEST_POSSIBLE_DATE = new Date(+new Date("2025-06-15") + 60000 * tzOffset);
export const EXPECTED_ARRIVAL_DATE = new Date(+new Date("2025-06-18") + 60000 * tzOffset);

export const MIDSOMMAR_DATE = new Date(+new Date("2025-06-20") + 60000 * tzOffset);

export const EXPECTED_DEPARTURE_DATE = new Date(+new Date("2025-06-21") + 60000 * tzOffset);
export const LATEST_POSSIBLE_DATE = new Date(+new Date("2025-06-22") + 60000 * tzOffset);
