import { Player } from './players';

interface CreatePlayerEmit {
  event: 'createPlayer';
  data: {
    name: string;
    race: string;
    class: string;
  };
  callback: (player: Player) => void;
}

interface UpdatePlayerEmit {
  event: 'updatePlayer';
  data: {
    name?: string;
    race?: string;
    class?: string;
    health?: number;
  };
}

interface GetDiceEmit {
  event: 'getDice';
  data: number;
  callback: (dice: number) => void;
}

export type SocketEmit = CreatePlayerEmit | UpdatePlayerEmit | GetDiceEmit;