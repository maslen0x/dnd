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

interface BaseLog {
  date: number;
  player: string;
}

export type Log = BaseLog & (ConnectLog | DisconnectLog | DiceLog);
