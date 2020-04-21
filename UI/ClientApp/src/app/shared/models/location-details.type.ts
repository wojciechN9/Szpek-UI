import { Address } from "../../location-meassurements/address.type";
import { Meassurement } from "../../location-meassurements/meassurement.type";

export interface LocationDetails {
  id: number;
  isActive: boolean;
  sensorId: number;
  sensorCode: string;
  address: Address;
  meassurements: Array<Meassurement>;
}
