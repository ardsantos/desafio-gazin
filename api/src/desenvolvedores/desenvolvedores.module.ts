import { Module } from '@nestjs/common';
import { DesenvolvedoresService } from './desenvolvedores.service';
import { DesenvolvedoresController } from './desenvolvedores.controller';

@Module({
  controllers: [DesenvolvedoresController],
  providers: [DesenvolvedoresService],
})
export class DesenvolvedoresModule {}
