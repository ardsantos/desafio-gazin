import { Module } from '@nestjs/common';
import { NiveisService } from './niveis.service';
import { NiveisController } from './niveis.controller';

@Module({
  controllers: [NiveisController],
  providers: [NiveisService],
})
export class NiveisModule {}
