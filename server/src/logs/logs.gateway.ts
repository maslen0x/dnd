import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { LogsService } from './logs.service';

@WebSocketGateway()
export class LogsGateway {
  constructor(private readonly logsService: LogsService) {}

  @SubscribeMessage('findAllLogs')
  findAll() {
    return this.logsService.findAll();
  }
}
