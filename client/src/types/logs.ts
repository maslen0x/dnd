import { Player, UpdatePlayerData } from './players';

interface BaseLog {
  date: number;
  player: string;
}

interface ConnectLog {
  event: 'connect';
}

interface DisconnectLog {
  event: 'disconnect';
}

interface DiceLog {
  event: 'dice';
  value: {
    dice: number;
    value: number;
  };
}

interface UpdatePlayerLog {
  event: 'updatePlayer';
  value: {
    old: Player;
    new: UpdatePlayerData;
  };
}

export type Log = BaseLog & (ConnectLog | DisconnectLog | DiceLog | UpdatePlayerLog);
