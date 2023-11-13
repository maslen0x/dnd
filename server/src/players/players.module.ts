import { Module } from '@nestjs/common';
import { LogsModule } from '@/logs/logs.module';
import { PlayersGateway } from './players.gateway';
import { PlayersService } from './players.service';

@Module({
  providers: [PlayersGateway, PlayersService],
  imports: [LogsModule],
  exports: [PlayersService],
})
export class PlayersModule {}
