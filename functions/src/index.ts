import * as admin from 'firebase-admin';
import { restoreBackupFactory } from "./restore-backup";
import { updateStatsFactory } from "./update-stats";

admin.initializeApp();

exports.restoreEntriesFromHistory = restoreBackupFactory();
exports.updateStatsAfterUpdate = updateStatsFactory();
