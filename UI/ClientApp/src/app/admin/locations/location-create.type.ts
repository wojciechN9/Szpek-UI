import { AddressCreate } from "./address-create.type";

export interface LocationCreate {
  sensorId: number;
  address: AddressCreate;
}
