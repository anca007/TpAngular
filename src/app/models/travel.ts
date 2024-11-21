// export type TravelType = 'car' | 'train' | 'plane';

export enum TravelType {
  Car = 'car',
  Train = 'train',
  Plane = 'plane'
}

export interface Travel {

  distance: number,
  consumptionFor100Km: number,
  //? rend l'attribut optionnel
  quantityCo2?: number,
  travelType? : TravelType
}
