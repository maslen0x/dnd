import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LogsService } from '@/logs/logs.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@WebSocketGateway()
export class PlayersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly playersService: PlayersService,
    private readonly logsService: LogsService,
  ) {}

  handleConnection(client: Socket) {
    console.log('connect', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id);

    const player = this.playersService.findOne(client.id);
    if (!player) return;

    this.playersService.remove(client.id);
    client.nsp.emit('updatePlayers', this.playersService.findAll());

    this.logsService.create({
      event: 'disconnect',
      player: player.name,
      date: Date.now(),
    });
    client.nsp.to('logs').emit('updateLogs', this.logsService.findAll());
  }

  @SubscribeMessage('createPlayer')
  create(@ConnectedSocket() client: Socket, @MessageBody() dto: CreatePlayerDto) {
    const player = this.playersService.create(client.id, dto);
    client.nsp.emit('updatePlayers', this.playersService.findAll());
    client.join('logs');

    this.logsService.create({
      event: 'connect',
      player: player.name,
      date: Date.now(),
    });
    client.nsp.to('logs').emit('updateLogs', this.logsService.findAll());

    return player;
  }

  @SubscribeMessage('findAllPlayers')
  findAll() {
    return this.playersService.findAll();
  }

  @SubscribeMessage('findOnePlayer')
  findOne(@MessageBody() id: string) {
    return this.playersService.findOne(id);
  }

  @SubscribeMessage('updatePlayer')
  update(@ConnectedSocket() client: Socket, @MessageBody() dto: Player) {
    const player = this.playersService.update(client.id, dto);
    client.nsp.emit('updatePlayers', this.playersService.findAll());
    return player;
  }

  @SubscribeMessage('removePlayer')
  remove(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    this.playersService.remove(id);
    client.nsp.emit('updatePlayers', this.playersService.findAll());
  }
}
