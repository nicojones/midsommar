import { ICoords } from "@/types";
import { toQuery } from "./to-query.function";

export const googleMapsDirections = (origin: ICoords, destination: ICoords, travelMode: "TRANSIT" | "DRIVING", departureTime?: number): string =>
  "https://www.google.com/maps/dir/" + toQuery({
    api: 1,
    origin: Object.values(origin).join(","),
    destination: Object.values(destination).join(","),
    travelmode: travelMode,
    departure_time: departureTime ? Math.round(+departureTime / 1000) : undefined,
    // ttype: departureTime ? "arr" : undefined,
    // time: "15:00",
    // date: departureTime ? toIsoDate(departureTime) : undefined,
    // layer: travelMode === "TRANSIT" ? "transit" : "traffic",
  });
