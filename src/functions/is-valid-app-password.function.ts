import { APP_PASSWORD, STORAGE_KEY } from "@/definitions";

export const isValidAppPassword = (): boolean => {
  return (localStorage.getItem(STORAGE_KEY.pass) === APP_PASSWORD);
};
