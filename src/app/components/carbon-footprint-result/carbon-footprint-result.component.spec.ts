import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintResultComponent } from './carbon-footprint-result.component';

describe('CarbonFootprintResultComponent', () => {
  let component: CarbonFootprintResultComponent;
  let fixture: ComponentFixture<CarbonFootprintResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbonFootprintResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarbonFootprintResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
