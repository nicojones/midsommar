import { AIRPORT_COORDS, EARLIEST_POSSIBLE_DATE, EXPECTED_ARRIVAL_DATE, EXPECTED_DEPARTURE_DATE, HOUSE_COORDS, LATEST_POSSIBLE_DATE, SPIRITUAL_DATE } from "@/definitions";
import { dbRef } from "@/firebase";
import { addDatesToAttendee, dayName, daysStaying, googleMapsDirections, toIsoDate } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { IAttendee } from "@/types";
import { AfterViewInit, Component } from '@angular/core';
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { get, query } from "firebase/database";
import { Loader, LoaderOptions } from 'google-maps';

interface IDrivingDirections {
  duration: string;
  distance: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent implements AfterViewInit {

  public map: any;

  public guestData: IAttendee | null = null;

  public readonly daysStaying = daysStaying;
  public readonly dayName = dayName;

  public driveDirections: IDrivingDirections | null = null;
  public trainDirections: IDrivingDirections | null = null;

  public readonly trainDirectionsUrl = googleMapsDirections(AIRPORT_COORDS, HOUSE_COORDS, "TRANSIT");
  public readonly driveDirectionsUrl = googleMapsDirections(AIRPORT_COORDS, HOUSE_COORDS, "DRIVING");
  public readonly spiritualDate = SPIRITUAL_DATE;
  public readonly partyDates = [EARLIEST_POSSIBLE_DATE, LATEST_POSSIBLE_DATE];

  public constructor(
    private auth: AuthService,
  ) {
    get(query(dbRef(`/people/${this.auth.user.uid}`)))
      .then(r => r.val())
      .then((attendee: IAttendee<string> | null) => {
        if (attendee?.attending) {
          this.guestData = addDatesToAttendee(attendee);
        }
      });
  }

  public ngAfterViewInit(): void {
    this.initMap();
  }

  public async initMap(): Promise<void> {
    if (window.location.hash === "#no-map") {
      return;
    }

    const options: LoaderOptions = {/* todo */ };
    const loader = new Loader('AIzaSyC4gvdZgL3nxUiHdkIlx54C06MU0bZKj5k', options);

    const google = await loader.load();

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: HOUSE_COORDS,
      zoom: 8,
    });

    const directionsRendererTrain = new google.maps.DirectionsRenderer({
      polylineOptions: { strokeColor: "purple" },
    });
    const directionsRendererDrive = new google.maps.DirectionsRenderer({
      polylineOptions: { strokeColor: "orange" },
    });
    directionsRendererTrain.setMap(this.map);
    directionsRendererDrive.setMap(this.map);

    const marker = new google.maps.Marker({
      map: this.map,
      position: HOUSE_COORDS,
    });

    const directionsTrain = new google.maps.DirectionsService().route({
      origin: AIRPORT_COORDS,
      destination: HOUSE_COORDS,
      travelMode: google.maps.TravelMode.TRANSIT,
    }, (result, status) => {
      console.log(result, status);
      directionsRendererTrain.setDirections(result);
      this.trainDirections = {
        distance: result.routes[0].legs[0].distance.text,
        duration: result.routes[0].legs[0].duration.text,
      };
    });

    const directionsDrive = new google.maps.DirectionsService().route({
      origin: AIRPORT_COORDS,
      destination: HOUSE_COORDS,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      console.log(result, status);
      directionsRendererDrive.setDirections(result);
      this.driveDirections = {
        distance: result.routes[0].legs[0].distance.text,
        duration: result.routes[0].legs[0].duration.text,
      };
    });

  }

  public get swedishTrainUrl(): string {
    let arrivalDate = toIsoDate(EXPECTED_ARRIVAL_DATE);
    let departureDate = toIsoDate(EXPECTED_DEPARTURE_DATE);

    if (this.guestData) {
      arrivalDate = toIsoDate(this.guestData.arrival);
      departureDate = toIsoDate(this.guestData.departure);
    }
    return `https://www.sj.se/sok-resa/valj-resa/Arlanda%20Central/S%C3%B6derhamn%20station/${arrivalDate}/${departureDate}`;
  }

  /**
   * Disable all the buttons in the calendar
   */
  public dateClass: MatCalendarCellClassFunction<Date> = (_cellDate, _view) => {
    return "disabled-date";
  };

}
