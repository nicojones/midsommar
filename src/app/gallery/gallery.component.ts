import { IValueLabel } from "@/types";
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {

  public readonly images: Partial<IValueLabel>[] = [
    {
      value: "/house/main-house.jpg",
      label: "Welcome!",
      description: "This is the place. Here you can see the main house, but there's also a barn, and (maybe) sauna, kayak and other cool stuff.",
    },
    {
      value: "/house/houses.jpg",
      label: "Houses",
      description: "There are two houses in the property, one of them being a barn that has a small &quot;chilling&quot; area where some people could sleep too",
    },
    {
      value: "/house/kitchen-1.jpg",
      label: "Kitchen",
      description: "Our beautiful kitchen. All the delicious food will be made here",
    },
    {
      label: "Kitchen",
      value: "/house/kitchen-2.jpg",
    },
    {
      value: "/house/lake.jpg",
      label: "Lake",
      description: "This picture shows what's next to the property. There's a huge lake you could go kayak or swim in.",
    },
    {
      value: "/house/rainbow.jpg",
      label: "Rainbow",
      description: "It rains a lot. Here's a picture of a rainbow 🌈",
    },
    {
      value: "/house/barn.jpg",
      label: "Barn",
      description: "There's tools and the like in here.",
    },
    {
      value: "/house/fire.jpg",
      label: "Fireplace",
      description: "Always happy to make a bondfire with whomever is interested :)",
    },
    {
      value: "/house/main-door.jpg",
      label: "Garden",
      description: "The property has a beautiful garden, as well as a massive forest",
    },
    {
      value: "/house/garden-table.jpg",
      label: "Garden",
      description: "If weather allows, we can sit outside most of the day. And, if the weather is dry (no rain in the past 24-48h) it's possible to sit outside without mosquitoes in the evening",
    },
    {
      value: "/house/neighbours.jpg",
      label: "Greenery",
      description: "The house is surrounded by beautiful nature and greenery. And yes, that house in the distance are our closest neighbours.",
    },
    {
      value: "/house/old-house-1.jpg",
      label: "Before renovations (2010)",
      description: "This is what the house looked like around the year 2010 when the previous owners bought the house, before it was renovated.",
    },
    {
      value: "/house/old-house-2.jpg",
      label: "Before renovations (2010)",
      description: "This is what the house looked like around the year 2010 when the previous owners bought the house, before it was renovated.",
    },
  ];

}
