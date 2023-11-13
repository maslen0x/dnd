import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket/socket-io.adapter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('CLIENT_URL') });
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
  await app.listen(configService.get('PORT'));
};

bootstrap();
