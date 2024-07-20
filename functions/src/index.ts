// eslint-disable-next-line no-restricted-imports
import { IAttendee, IStats, IStatsAtendee } from "../../src/types";
import { database } from "firebase-functions";
import * as admin from 'firebase-admin';

admin.initializeApp();

export default database.ref('/people/{uid}')
  .onWrite(async (_change, _context) => {
    const peopleRef = admin.database().ref('people');
    const statsRef = admin.database().ref('stats');

    const snapshot = await peopleRef.once('value');
    const people: Record<string, IAttendee> = snapshot.val();

    let attending = 0;
    let hasCar = 0;
    let freeCarSeats = 0;
    let hasTent = 0;
    let totalDuration = 0;
    let totalPeople = 0;
    const peopleList: IStatsAtendee[] = [];

    for (const uid in people) {
      const person = people[uid];
      if (person.attending) {
        attending++;
      }
      if (person.hasTent) {
        hasTent++;
      }
      if (person.hasCar) {
        hasCar++;
      }
      if (person.hasCar) {
        freeCarSeats += person.freeCarSeats;
      }
      const arrival = new Date(person.arrival);
      const departure = new Date(person.departure);
      const duration = Math.round((+departure - +arrival) / (1000 * 60 * 60 * 24)); // duration in days
      totalDuration += duration;
      totalPeople++;

      if (person.attending) {
        peopleList.push({
          name: person.name,
          email: person.email,
          arrival: person.arrival,
          departure: person.departure,
          freeCarSeats: person.freeCarSeats,
          attending: person.attending,
          hasCar: person.hasCar,
          hasTent: person.hasTent,
          uid,
        });
      }
    }

    const averageDuration = totalPeople > 0 ? totalDuration / totalPeople : 0;

    const stats: IStats = {
      attending,
      hasCar,
      freeCarSeats,
      hasTent,
      averageDuration,
      people: peopleList,
    };

    await statsRef.set(stats);
  });
