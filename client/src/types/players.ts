import { Characteristic } from './characteristics';
import { Equipment } from './equipment';

export interface Player {
  id: string;
  name: string;
  background: string;
  health: number;
  class: string;
  race: string;
  weapon: Equipment;
  armor: Equipment;
  characteristics: Record<Characteristic, number>;
  savingThrows: string[];
  skills: string[];
}

export interface CreatePlayerData {
  name: string;
  background: string;
  race: string;
  class: string;
  weapon: Equipment;
  armor: Equipment;
  characteristics: Record<Characteristic, number>;
  savingThrows: string[];
  skills: string[];
}
