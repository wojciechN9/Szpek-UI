import { Meassurement } from "../../../location-meassurements/meassurement.type";
import { Address } from "../../../location-meassurements/address.type";

export interface LocationDetails {
  id: number;
  isActive: boolean;
  sensorId: number;
  sensorCode: string;
  address: Address;
  meassurements: Array<Meassurement>;
}
