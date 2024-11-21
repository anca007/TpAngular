import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Travel, TravelType} from "../models/travel";
import {map, Observable, Subject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private travelsSubjects = new Subject<Travel[]>()
  public travels$ = this.travelsSubjects.asObservable()
  private readonly BASE_URL = "http://localhost:8080/"

  constructor(private http: HttpClient) {
  }

  public refreshTravels() {
    console.log("dans el refresh")
    this.getTravels().subscribe(
      travels => {
        this.travelsSubjects.next(travels)
        console.log(travels)
      }
    )
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

    return this.calculateCo2(travel).pipe(
      //à partir du calcul, on renvoie une requete pour ajouter le travel
      switchMap(
        quantityCo2 => {
          const data = {
            userId: 1,
            distance: travel.distance,
            consommation: travel.consumptionFor100Km,
            co2: Math.ceil(quantityCo2),
            travelType : travel.travelType ?? TravelType.Car
          }

          return this.http.post<{ success: String }>(this.BASE_URL + "ajouterUnVoyage", data).pipe(
            //après l'ajout du travel on refresh nos voyages
            switchMap(
              (response) => {
                if (response.success) {
                  this.refreshTravels()
                }
                return this.travels$
              }
            )
          )
        }
      )
    )
  }

  private calculateCo2(travel: Travel): Observable<number> {
    console.log(travel)
    if (travel.travelType == TravelType.Train) {
      return this.getQuantityCo2ByTrain(travel.distance)
    } else if (travel.travelType == TravelType.Plane) {
      return this.getQuantityCo2ByPlane(travel.distance)
    } else {
      return this.getQuantityCo2ByCar(travel)
    }
  }

  public getQuantityCo2ByCar(travel: Travel): Observable<number> {
    const params = new HttpParams()
      .set("distanceKm", travel.distance)
      .set("consommationPour100Km", travel.consumptionFor100Km)
    return this.http.get<{ empreinteCarbone: number }>(this.BASE_URL + "calculerTrajetVoiture", {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getQuantityCo2ByPlane(distance: number) {
    const params = new HttpParams().set("distanceKm", distance)
    return this.http.get<{ empreinteCarbone: number }>(this.BASE_URL + "calculerTrajetAvion", {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getQuantityCo2ByTrain(distance: number) {
    const params = new HttpParams().set("distanceKm", distance)
    return this.http.get<{ empreinteCarbone: number }>(this.BASE_URL + "calculerTrajetTrain", {params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  public getTravelResume() {

    return this.travels$.pipe(
      map(
        travels => {
          let totalDistance = 0;
          let averageConsumption = 0;
          let totalCo2 = 0;

          for (const travel of travels) {
            totalDistance += travel.distance;
            //calcul moyen de la consommation non pas par nombre de voyages
            //mais par rapport au nombre total de km
            averageConsumption += travel.consumptionFor100Km * travel.distance;
            totalCo2 += travel.quantityCo2 ?? 0
          }

          return {
            totaleDistance: totalDistance,
            averageConsumption: averageConsumption / totalDistance,
            totalCo2: totalCo2
          }
        }
      )
    )
  }
}
