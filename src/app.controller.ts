import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Informações iniciais da API',
    description: 'Retorna dados básicos sobre o funcionamento e status da API.',
  })
  @ApiResponse({
    status: 200,
    description: 'Informações retornadas com sucesso.',
  })
  getInfo() {
    return this.appService.getInfo();
  }
}
