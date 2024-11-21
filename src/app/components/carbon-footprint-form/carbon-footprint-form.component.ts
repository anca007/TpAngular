import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CarbonFootprintComputeService} from "../../services/carbon-footprint-compute.service";

@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.css'
})
export class CarbonFootprintFormComponent implements OnInit {

  public form!: FormGroup
  public isCar: Boolean = true

  constructor(private cfpcs: CarbonFootprintComputeService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      distance: new FormControl(null, [Validators.required, Validators.min(1)]),
      consumptionFor100Km: new FormControl(null, [Validators.required, Validators.min(1)]),
      date: new FormControl(null, [Validators.required]),
      travelType: new FormControl('car', [Validators.required, this.selectTravelTypeValidator])
    })
  }

  public addTravel() {
    console.log(this.form)
    if (this.form.valid) {
      this.cfpcs.addTravel(this.form.value).subscribe(
        response => console.log(response)
      )
    }
  }

  public selectTravelTypeValidator(control: AbstractControl) {
    const value = control.value

    if (!['car', 'plane', 'train'].includes(value)) {
      return {value: true}
    }

    return null
  }

  public onSelectTravelType() {
    const travelType = this.form.value.travelType

    if (travelType == 'car') {
      this.isCar = true
      this.form.get('consumptionFor100Km')?.setValidators([Validators.required, Validators.min(1)])
    } else {
      this.isCar = false
      this.form.get('consumptionFor100Km')?.clearValidators()
      this.form.get('consumptionFor100Km')?.setValue(0)
    }
    this.form.get('consumptionFor100Km')?.updateValueAndValidity()
  }

}
