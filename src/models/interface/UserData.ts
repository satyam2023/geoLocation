export interface IUser {
  isDriver: boolean;
  region: IRegion;
  name: string;
  carNumber: string;
}

export interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ILocation {
  lat: number;
  lng: number;
}
