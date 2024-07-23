import { BEFORE_THIS_DATE_WE_ARE_JUST_CHECKING_WHO_IS_INTERESTED } from "@/definitions";

/**
 * Use this to print "coming"/"interested" or "provisional"/"definitive" text based on the current date.
 * For now, we're just checking who has interest in Midsommar. After january we'll want to get only commited people
 */
export function comingOrInterested([before, after]: [string, string]): string {
  const now = new Date();

  if (now < BEFORE_THIS_DATE_WE_ARE_JUST_CHECKING_WHO_IS_INTERESTED) {
    return before;
  } else {
    return after;
  }

}
