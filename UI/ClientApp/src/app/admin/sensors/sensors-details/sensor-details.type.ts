import { Owner } from "../owner.type";
import { Location } from "../../locations/location.type";

export interface SensorDetails {
  id: number;
  code: string;
  isPrivate: boolean;
  owner: Owner;
  locations: Array<Location>;
}
