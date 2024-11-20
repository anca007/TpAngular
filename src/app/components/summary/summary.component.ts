import { Component } from '@angular/core';
import {CarbonFootprintComponent} from "../carbon-footprint/carbon-footprint.component";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-summary',
  standalone: true,
    imports: [
        CarbonFootprintComponent,
        FooterComponent,
        HeaderComponent
    ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {

}
