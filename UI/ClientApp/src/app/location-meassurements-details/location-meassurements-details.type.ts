import { MeassurementDetails } from "./meassurement-details.type";
import { Address } from "../location-meassurements/address.type";

export interface LocationMeassurementsDetails {
  id: number;
  address: Address;
  meassurements: Array<MeassurementDetails>;
}
