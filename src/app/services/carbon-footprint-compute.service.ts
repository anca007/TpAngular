import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Travel, TravelType} from "../models/travel";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService implements OnInit {

  public travels: Array<Travel> = []
  private readonly BASE_URL = "http://localhost:8080/"

  constructor(private http: HttpClient) {
    // this.travels = [
    //   {distance: 50, consumptionFor100Km: 5, quantityCo2: 10},
    //   {distance: 150, consumptionFor100Km: 6, quantityCo2: 2},
    //   {distance: 250, consumptionFor100Km: 7, quantityCo2: 5},
    //   {distance: 350, consumptionFor100Km: 2, quantityCo2: 8},
    //   {distance: 450, consumptionFor100Km: 1, quantityCo2: 12}
    // ]
  }

  ngOnInit(): void {
    this.getTravels()
  }

  public getTravels(): Observable<Travel[]> {
    return this.http.get<any[]>(this.BASE_URL + "tousMesVoyages/1").pipe(
      map(
        response => response.map(item => {
          return {
            distance: item.distance,
            consumptionFor100Km: item.consommation,
            quantityCo2: item.co2,
            travelType: item.travelType,
          } as Travel
        })
      )

      // ou écrire
      // map(
      //   response => response.map(item => ({
      //     distance: item.distance,
      //     consumptionFor100Km: item.consommation,
      //     quantityCo2: item.co2,
      //     travelType: item.travelType
      //   }) as Travel)
      // )
    )
  }

  public addTravel(travel: Travel) {

    this.calculateCo2(travel).subscribe(response => {
        travel.quantityCo2 = Math.ceil(response.empreinteCarbone)
        this.travels.push(travel)
      }
    )
  }

  private calculateCo2(travel: Travel): Observable<any> {

    if (travel.travelType == TravelType.Train) {
      return this.getQuantityCo2ByTrain(travel.distance)
    } else if (travel.travelType == TravelType.Plane) {
      return this.getQuantityCo2ByPlane(travel.distance)
    } else {
      return this.getQuantityCo2ByCar(travel)
    }
  }

  public getQuantityCo2ByCar(travel: Travel) {
    const params = new HttpParams()
      .set("distanceKm", travel.distance)
      .set("consommationPour100Km", travel.consumptionFor100Km)
    return this.http.get<any>(this.BASE_URL + "calculerTrajetVoiture", {params})
  }

  public getQuantityCo2ByPlane(distance: number) {
    const params = new HttpParams().set("distanceKm", distance)
    return this.http.get<any>(this.BASE_URL + "calculerTrajetAvion", {params})
  }

  public getQuantityCo2ByTrain(distance: number) {
    const params = new HttpParams().set("distanceKm", distance)
    return this.http.get<any>(this.BASE_URL + "calculerTrajetTrain", {params})
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
      totalCo2 += travel.quantityCo2 ?? 0
    }
    return {totaleDistance: totalDistance, averageConsumption: averageConsumption / totalDistance, totalCo2: totalCo2}
  }


}
