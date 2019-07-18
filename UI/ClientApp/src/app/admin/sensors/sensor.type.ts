import { Owner } from "./owner.type";

export interface Sensor {
  id: number;
  code: string;
  isPrivate: boolean;
  owner: Owner;
}
