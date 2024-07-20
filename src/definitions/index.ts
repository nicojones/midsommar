import { IValueLabel } from "@/types";

export * from "./storage-keys.definition";
export * from "./store.definition";


export const APP_PASSWORD = "swedishsummer";
export const RIPPLES_ENABLED = true;

export const TZ_OFFSET = 60000 * new Date().getTimezoneOffset();

/**
 * Also change in /functions/index.ts
 */
export const EARLIEST_POSSIBLE_DATE = new Date(+new Date("2025-06-15") + TZ_OFFSET);
export const EXPECTED_ARRIVAL_DATE = new Date(+new Date("2025-06-18") + TZ_OFFSET);

export const MIDSOMMAR_DATE = new Date(+new Date("2025-06-20") + TZ_OFFSET);

export const EXPECTED_DEPARTURE_DATE = new Date(+new Date("2025-06-21") + TZ_OFFSET);
/**
 * Also change in /functions/index.ts
 */
export const LATEST_POSSIBLE_DATE = new Date(+new Date("2025-06-22"));

export const ADMIN_UIDS = [
  "I5LzPFdWFgYhyCTqFZPWQ5euYME2", // NICO
  "IxIOAfnXIiYGJglVWAtvtODIYCb2", // CELINE
];

export const PROBLEMATIC_FOODS: IValueLabel[] = [
  { value: "onions", label: "🧅 raw onions", icon: "🧅"},
  { value: "nuts", label: "🌰 nut allergy", icon: "🌰" },
  { value: "peanut", label: "🥜 peanut allergy", icon: "🥜" },
];
