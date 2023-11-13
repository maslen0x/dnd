import { Module } from '@nestjs/common';
import { LogsModule } from '@/logs/logs.module';
import { PlayersModule } from '@/players/players.module';
import { DicesGateway } from './dices.gateway';
import { DicesService } from './dices.service';

@Module({
  providers: [DicesGateway, DicesService],
  imports: [LogsModule, PlayersModule],
})
export class DicesModule {}
