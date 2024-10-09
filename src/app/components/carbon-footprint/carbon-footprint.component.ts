import {Component} from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent,
    DecimalPipe,
    NgIf,
    NgStyle,
    NgClass,
    NgForOf
  ],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  public distance: number = 0
  public consumptionFor100Km: number = 0
  public travels: Array<any>

  constructor() {
    this.travels = [
      {distance: 50, consumptionFor100Km: 5},
      {distance: 150, consumptionFor100Km: 6},
      {distance: 250, consumptionFor100Km: 7},
      {distance: 350, consumptionFor100Km: 8},
      {distance: 450, consumptionFor100Km: 9}
    ]
    this.calculateDistanceAndAverage();
  }

  public add100Km() {
    this.distance += 100;
  }

  public addTravel() {
    const distance = Math.ceil(Math.random() * 1000)
    const consumption = Math.ceil(Math.random() * 20)
    this.travels.push({distance: distance, consumptionFor100Km: consumption})
    this.calculateDistanceAndAverage()
  }

  public calculateDistanceAndAverage() {
    let total = 0;
    let average = 0;
    for (const travel of this.travels) {
      total += travel.distance;
      average += travel.consumptionFor100Km;
    }
    this.distance = total;
    this.consumptionFor100Km = average / this.travels.length;
  }


}
