import {Component} from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CarbonFootprintComputeService} from "../../services/carbon-footprint-compute.service";
import {Travel} from "../../models/travel";

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
  providers: [CarbonFootprintComputeService],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  public distance: number = 0
  public consumptionFor100Km: number = 0
  public co2: number = 0
  public travels: Travel[] = []

  constructor(private cfpcs: CarbonFootprintComputeService) {
    this.cfpcs.getTravels().subscribe(
      travels =>{
        this.travels = travels
        console.log(this.travels)
      }
    )
    this.calculateDistanceAndAverage();
  }

  public add100Km() {
    this.distance += 100;
  }

  public addTravel() {
    const distance = Math.ceil(Math.random() * 1000)
    const consumption = Math.ceil(Math.random() * 20)
    this.cfpcs.addTravel({distance: distance, consumptionFor100Km: consumption})
    this.calculateDistanceAndAverage()
  }

  public calculateDistanceAndAverage() {
    let resume = this.cfpcs.getTravelResume()
    this.distance = resume.totaleDistance;
    this.consumptionFor100Km = resume.averageConsumption
    this.co2 = resume.totalCo2
  }


}
