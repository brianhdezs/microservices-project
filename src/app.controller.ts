import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHelloHttp(): string {
    return 'Hola Mundo desde HTTP';
  }
}
