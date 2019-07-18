import { Sensor } from "../sensors/sensor.type";

export interface SensorOwner {
  id: number;
  name: string;
  address: string;
  isCompany: boolean;
  sensors: Array<Sensor>;
} 
