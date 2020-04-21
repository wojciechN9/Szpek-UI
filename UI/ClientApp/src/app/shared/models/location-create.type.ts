import { AddressCreate } from "../../admin/locations/address-create.type";

export interface LocationCreate {
  sensorId: number;
  address: AddressCreate;
}
