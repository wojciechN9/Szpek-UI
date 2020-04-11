import { Meassurement } from "./meassurement.type";
import { Address } from "./address.type";

export interface LocationMeassurements {
  id: number;
  address: Address;
  meassurements: Array<Meassurement>;
}
