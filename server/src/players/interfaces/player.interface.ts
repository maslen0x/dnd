import { Characteristic } from '../types/characteristic.type';
import { Equipment } from '../types/equipment.type';

export interface Player {
  id: string;
  name: string;
  background: string;
  health: number;
  class: string;
  race: string;
  characteristics: Record<Characteristic, number>;
  weapon: Equipment;
  armor: Equipment;
  savingThrows: string[];
  skills: string[];
}
