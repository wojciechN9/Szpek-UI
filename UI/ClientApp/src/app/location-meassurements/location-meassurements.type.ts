import { Address } from "./address.type";
import { Measurement } from "./measurement.type";

export interface LocationMeassurements {
  id: number;
  address: Address;
  meassurements: Array<Measurement>;
}
