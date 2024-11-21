import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  public travels: Array<any>

  constructor() {
    this.travels = [
      {distance: 50, consumptionFor100Km: 5, quantityCo2: 10},
      {distance: 150, consumptionFor100Km: 6, quantityCo2: 2},
      {distance: 250, consumptionFor100Km: 7, quantityCo2: 5},
      {distance: 350, consumptionFor100Km: 2, quantityCo2: 8},
      {distance: 450, consumptionFor100Km: 1, quantityCo2: 12}
    ]
  }

  public getTravels(): any[] {
    return this.travels;
  }

  public addTravel(travel: any) {
    if (travel.travelType == 'car') {
      travel.quantityCo2 = Math.ceil(travel.distance * travel.consumptionFor100Km * 2.3 / 100)
    } else if (travel.travelType == 'plane') {
      travel.quantityCo2 = Math.ceil(travel.distance * 0.03)
    } else {
      travel.quantityCo2 = Math.ceil(travel.distance * 0.2)
    }


    console.log(travel)
    this.travels.push(travel)
  }

  public getTravelResume() {
    let totalDistance = 0;
    let averageConsumption = 0;
    let totalCo2 = 0;
    for (const travel of this.travels) {
      totalDistance += travel.distance;
      //calcul moyen de la consommation non pas par nombre de voyages
      //mais par rapport au nombre total de km
      averageConsumption += travel.consumptionFor100Km * travel.distance;
      totalCo2 += travel.quantityCo2
    }
    return {totaleDistance: totalDistance, averageConsumption: averageConsumption / totalDistance, totalCo2: totalCo2}
  }
}
