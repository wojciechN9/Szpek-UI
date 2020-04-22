import { Owner } from "../owner.type";
import { Location } from "../../../shared/models/location.type";

export interface SensorDetails {
  id: number;
  code: string;
  isPrivate: boolean;
  owner: Owner;
  locations: Array<Location>;
}
