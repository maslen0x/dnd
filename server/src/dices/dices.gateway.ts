import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LogsService } from '@/logs/logs.service';
import { PlayersService } from '@/players/players.service';
import { DicesService } from './dices.service';

@WebSocketGateway()
export class DicesGateway {
  constructor(
    private readonly dicesService: DicesService,
    private readonly logsService: LogsService,
    private readonly playersService: PlayersService,
  ) {}

  @SubscribeMessage('getDice')
  getDice(@ConnectedSocket() client: Socket, @MessageBody() dice: number) {
    const value = this.dicesService.getDice(dice);
    const player = this.playersService.findOne(client.id);
    this.logsService.create({
      event: 'dice',
      value: { dice, value },
      player: player.name,
      date: Date.now(),
    });
    client.nsp.to('logs').emit('updateLogs', this.logsService.findAll());
    return value;
  }
}
