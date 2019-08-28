import { MeassurementDetails } from "./meassurement-details.type";

export interface LocationMeassurementsDetails {
  id: number;
  address: Address;
  meassurements: Array<MeassurementDetails>;
}
