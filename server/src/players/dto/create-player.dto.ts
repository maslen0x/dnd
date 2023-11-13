import { Player } from '../interfaces/player.interface';
import { Characteristic } from '../types/characteristic.type';
import { Equipment } from '../types/equipment.type';

export class CreatePlayerDto implements Omit<Player, 'id' | 'health'> {
  name: string;
  background: string;
  race: string;
  class: string;
  characteristics: Record<Characteristic, number>;
  weapon: Equipment;
  armor: Equipment;
  savingThrows: string[];
  skills: string[];
}
