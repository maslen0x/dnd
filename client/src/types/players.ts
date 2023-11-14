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

export interface CreatePlayerData extends Omit<Player, 'id' | 'health'> {}

export interface UpdatePlayerData extends Partial<CreatePlayerData> {
  health?: number;
}
