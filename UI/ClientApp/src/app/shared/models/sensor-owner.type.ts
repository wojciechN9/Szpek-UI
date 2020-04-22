import { Sensor } from "../../admin/sensors/sensor.type";

export interface SensorOwner {
  id: number;
  name: string;
  address: string;
  isCompany: boolean;
  sensors: Array<Sensor>;
} 
