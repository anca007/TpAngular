import {Component, OnInit} from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CarbonFootprintComputeService} from "../../services/carbon-footprint-compute.service";
import {Travel} from "../../models/travel";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
export class CarbonFootprintComponent implements OnInit {

  public distance: number = 0
  public consumptionFor100Km: number = 0
  public co2: number = 0
  public travels: Travel[] = []

  constructor(private cfpcs: CarbonFootprintComputeService) {
  }

  public ngOnInit() {
    this.cfpcs.refreshTravels()
    this.getTravels()
  }

  public getTravels() {

    this.cfpcs.travels$.subscribe(
      travels => {
        this.travels = travels
        this.calculateDistanceAndAverage();
      }
    )
  }

  public add100Km() {
    this.distance += 100;
  }

  public addTravel() {
    const distance = Math.ceil(Math.random() * 1000)
    const consumption = Math.ceil(Math.random() * 20)
    this.cfpcs.addTravel({distance: distance, consumptionFor100Km: consumption}).subscribe(
      response => {
        this.calculateDistanceAndAverage()
      }
    )
  }

  public calculateDistanceAndAverage() {
    this.cfpcs.getTravelResume().subscribe(
      resume => {
        this.distance = resume.totaleDistance;
        this.consumptionFor100Km = resume.averageConsumption
        this.co2 = resume.totalCo2
      }
    )

  }


}
