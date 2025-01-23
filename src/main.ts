import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });
  microservice.listen();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Servidor HTTP corriendo en http://localhost:3000');
}
bootstrap();

