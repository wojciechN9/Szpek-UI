import { Address } from "../../location-meassurements/address.type";
import { Measurement } from "../../location-meassurements/measurement.type";

export interface LocationDetails {
  id: number;
  isActive: boolean;
  sensorId: number;
  sensorCode: string;
  address: Address;
  meassurements: Array<Measurement>;
}
