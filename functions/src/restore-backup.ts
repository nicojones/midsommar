import { database } from "firebase-functions";
import * as admin from 'firebase-admin';

// Create, at the ROOT of the database, `restore: 17283843823` and it will restore it.
// Use the KEYS of `backup` to select what to restore :)

const SUCCESS_MESSAGE = "Backup successful! Delete me";
const ERROR_MESSAGE = "INVALID TS (not present in the backups list)";

export const restoreBackupFactory = () => database.ref('/restore')
  .onWrite(async (_change, _context) => {
    const peopleRef = admin.database().ref('people');
    const restoreTimeRef = admin.database().ref('restore');
    const restoreTime = (await restoreTimeRef.once('value')).val();

    if (!restoreTime || [SUCCESS_MESSAGE, ERROR_MESSAGE].includes(restoreTime)) {
      return; // nothing to do! just a standard message
    }

    const backupRef = admin.database().ref(`backup/${restoreTime}`);
    const backup = (await backupRef.once('value')).val();
    if (backup) {
      await peopleRef.set(backup);
      await restoreTimeRef.set(SUCCESS_MESSAGE);
    } else {
      await restoreTimeRef.set(ERROR_MESSAGE);
    }
  });
