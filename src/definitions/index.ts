import { ICoords, IValueLabel } from "@/types";

export * from "./storage-keys.definition";
export * from "./store.definition";


export const APP_PASSWORD = "swedishsummer";
export const RIPPLES_ENABLED = true;

export const TZ_OFFSET = 60000 * new Date().getTimezoneOffset();

/**
 * Also change in /functions/index.ts
 */
export const EARLIEST_POSSIBLE_DATE = new Date(+new Date("2025-06-16") + TZ_OFFSET);
export const EXPECTED_ARRIVAL_DATE = new Date(+new Date("2025-06-18") + TZ_OFFSET);

export const MIDSOMMAR_DATE = new Date(+new Date("2025-06-20") + TZ_OFFSET);
export const SPIRITUAL_DATE = "2025-06-19" as const;

export const EXPECTED_DEPARTURE_DATE = new Date(+new Date("2025-06-21") + TZ_OFFSET);
/**
 * Also change in /functions/index.ts
 */
export const LATEST_POSSIBLE_DATE = new Date(+new Date("2025-06-22 12:00") + TZ_OFFSET);

export const ADMIN_UIDS = [
  "I5LzPFdWFgYhyCTqFZPWQ5euYME2", // NICO
  "IxIOAfnXIiYGJglVWAtvtODIYCb2", // CELINE
];

export const PROBLEMATIC_FOODS: IValueLabel[] = [
  { value: "wheat", label: "🌾 wheat issues/allergy", icon: "🌾" },
  { value: "nuts", label: "🌰 nut allergy", icon: "🌰" },
  { value: "peanuts", label: "🥜 peanut allergy", icon: "🥜" },
  { value: "soy", label: "🫛 soy allergy (e.g. tofu)", icon: "🫛" },
  { value: "?", label: "❓ missing one? let us know", icon: "❓", disabled: true },
];

export const TASK_HELP: IValueLabel[] = [
  { value: "house", percent: 7/10, label: "🏡 help with house tasks", icon: "🏡", description: "Mow the lawn, trim herbs here and there, clear paths, tidy the barn, paint something..." },
  { value: "clean", percent: 1/3, label: "🧹 help with cleaning", icon: "🧹", description: "Help clean after meals, help tidy up. Least amount of work" },
  { value: "cook", percent: 1/3, label: "👩‍🍳 help with cooking", icon: "👩‍🍳", description: "Help with cooking and preparing food. This takes more time, but might be fun for you" },
  { value: "shopping", percent: 1/5, label: "🚛 help with shopping", icon: "🚛", description: "Implies potential trips to supermarkets or shops to buy food" },
  { value: "prepare", percent: 1/4, label: "🍴 help with preparations", icon: "🍴", description: "prepare tables, organize spaces, assist kitchen" },
];

export const BETTER_DATES: IValueLabel[] = [
  { value: "-2", label: "two weeks before (June 6th)", icon: "" },
  { value: "-1", label: "one week before (June 13th)", icon: "" },
  { value: "1", label: "one week later (June 27th)", icon: "" },
  { value: "2", label: "two weeks later (July 4th)", icon: "" },
];

export const HOUSE_COORDS: ICoords = { lat: 61.269927, lng: 16.850408 } as const;
export const AIRPORT_COORDS: ICoords = { lat: 59.64957359874774, lng: 17.929290658863916 } as const;

export const BEFORE_THIS_DATE_WE_ARE_JUST_CHECKING_WHO_IS_INTERESTED = new Date("2025-01-01");
