import { IAtendee } from "@/types";

export const addDatesToAtendee = (atendee: IAtendee<string>): IAtendee<Date> => ({
  ...atendee,
  editedOn: new Date(atendee.editedOn),
  addedOn: new Date(atendee.addedOn),
});


export const isoDatesToAtendee = (atendee: IAtendee<Date>): IAtendee<string> => ({
  ...atendee,
  editedOn: atendee.editedOn.toISOString(),
  addedOn: atendee.addedOn.toISOString(),
});
