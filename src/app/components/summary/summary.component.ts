import { Component } from '@angular/core';
import {CarbonFootprintComponent} from "../carbon-footprint/carbon-footprint.component";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CarbonFootprintComponent,
    FooterComponent,
    HeaderComponent,
    CarbonFootprintFormComponent
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
