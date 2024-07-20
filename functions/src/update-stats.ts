// eslint-disable-next-line no-restricted-imports
import { IAttendee, IStats, IStatsAttendee, IStatsPerDay } from "../../src/types";
import { database } from "firebase-functions";
import * as admin from 'firebase-admin';

/**
 * Also change in /definitions/index.ts
 */
const LATEST_POSSIBLE_DATE = new Date(+new Date("2025-06-22"));
const EARLIEST_POSSIBLE_DATE = new Date(+new Date("2025-06-15"));
const MS_PER_DAY = 86_400_000;

const pad = (val: number): string => val < 10 ? `0${val}` : `${val}`;
const toDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const updateStatsFactory = () => database.ref('/people/{uid}')
  .onWrite(async (_change, _context) => {
    const peopleRef = admin.database().ref('people');
    const statsRef = admin.database().ref('stats');

    const snapshot = await peopleRef.once('value');
    const people: Record<string, IAttendee<string>> = snapshot.val();

    // BACKUP everything to the current unix timestamp key
    const now = +new Date();
    const backupRef = admin.database().ref(`backup/${now}`);
    await backupRef.set(people);
    // BACKUP complete

    let attending = 0;
    let amountHaveCar = 0;
    let freeCarSeats = 0;
    let amountHaveTent = 0;
    let amountSleepInTent = 0;
    let totalDuration = 0;
    let totalPeople = 0;
    const problematicFoods: Record<string, number> = {};
    const peopleList: IStatsAttendee<string>[] = [];
    const perDay: Record<string, IStatsPerDay<string>> = {};

    for (const uid in people) {
      const person = people[uid];

      if (person.attending) {

        attending += 1;

        if (person.hasTent) {
          amountHaveTent += 1;
          if (person.sleepsInTent) {
            amountSleepInTent += 1;
          }
        }
        if (person.hasCar) {
          amountHaveCar++;
          freeCarSeats += person.freeCarSeats;
        }
        const arrival = new Date(person.arrival);
        const departure = new Date(person.departure);
        const duration = Math.round((+departure - +arrival) / (1000 * 60 * 60 * 24)); // duration in days
        // Used to calculate the average stay
        totalDuration += duration;
        // Used to calculate the number of people coming
        totalPeople++;

        // Add the problematic foods to the list.
        person.problematicFoods.forEach(f => {
          if (!problematicFoods[f]) {
            problematicFoods[f] = 1;
          } else {
            problematicFoods[f] += 1;
          }
        });

        const attendee: IStatsAttendee<string> = {
          ...person,
          sleepsInTent: person.hasTent && person.sleepsInTent,
          problematicFoods: person.problematicFoods,
          uid,
        };

        peopleList.push(attendee);

        for (let i = +EARLIEST_POSSIBLE_DATE; i < +LATEST_POSSIBLE_DATE; i += MS_PER_DAY) {
          if (i >= +new Date(attendee.arrival) && i <= +new Date(attendee.departure)) {
            const dateKey = toDate(new Date(i));
            perDay[dateKey] = perDay[dateKey] ?? {
              attending: 0,
              averageDuration: 1,
              amountHaveCar: 0,
              amountHaveTent: 0,
              amountSleepInTent: 0,
              freeCarSeats: 0,
              problematicFoods: {},
              people: [],
            };
            const day = perDay[dateKey];
            day.attending += 1;
            day.amountHaveCar += Number(person.hasCar);
            day.freeCarSeats += person.freeCarSeats;
            day.amountHaveTent += Number(person.hasTent);
            day.amountSleepInTent += Number(person.hasTent && person.sleepsInTent);
            day.people.push(attendee);

            person.problematicFoods.forEach(f => {
              if (!day.problematicFoods[f]) {
                day.problematicFoods[f] = 1;
              } else {
                day.problematicFoods[f] += 1;
              }
            });
          }
        }
      }
    }

    const averageDuration = totalPeople > 0 ? totalDuration / totalPeople : 0;

    const stats: IStats<string> = {
      attending,
      amountHaveCar,
      freeCarSeats,
      amountHaveTent,
      amountSleepInTent,
      averageDuration,
      people: peopleList,
      perDay,
      problematicFoods,
    };

    await statsRef.set(stats);
  });

// -------------------------
// -------------------------
// -------------------------
// -------------------------
