import { Address } from "../../location-meassurements/address.type";

export interface Location {
  id: number;
  isActive: boolean;
  sensorId: number;
  address: Address;
}
