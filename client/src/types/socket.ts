import { CreatePlayerData, Player, UpdatePlayerData } from './players';

interface CreatePlayerEmit {
  event: 'createPlayer';
  data: CreatePlayerData;
  callback: (player: Player) => void;
}

interface UpdatePlayerEmit {
  event: 'updatePlayer';
  data: UpdatePlayerData;
  callback: (player: Player) => void;
}

interface GetDiceEmit {
  event: 'getDice';
  data: number;
  callback: (dice: number) => void;
}

export type SocketEmit = CreatePlayerEmit | UpdatePlayerEmit | GetDiceEmit;
