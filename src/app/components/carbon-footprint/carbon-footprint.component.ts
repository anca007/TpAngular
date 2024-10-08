import { Component } from '@angular/core';
import {CarbonFootprintFormComponent} from "../carbon-footprint-form/carbon-footprint-form.component";
import {CarbonFootprintResultComponent} from "../carbon-footprint-result/carbon-footprint-result.component";

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent
  ],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.css'
})
export class CarbonFootprintComponent {

  ngOnChanges(): void {
    console.log(1)
  }

  ngOnInit() {
    console.log(2)
  }

  ngDoCheck() {
    console.log(3)
  }

  ngAfterContentInit() {
    console.log(4)
  }

  ngAfterContentChecked() {
    console.log(5)
  }

  ngAfterViewInit() {
    console.log(6)
  }

  ngAfterViewChecked() {
    console.log(7)
  }

  ngOnDestroy() {
    console.log(8)
  }

}
