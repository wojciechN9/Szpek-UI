import { Meassurement } from "./meassurement.type";

export interface LocationMeassurements {
  id: number;
  address: Address;
  meassurements: Array<Meassurement>;
}
