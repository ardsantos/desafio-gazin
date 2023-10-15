import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DesenvolvedoresController } from './desenvolvedores.controller';
import { DesenvolvedoresService } from './desenvolvedores.service';

@Module({
  controllers: [DesenvolvedoresController],
  providers: [DesenvolvedoresService, PrismaService],
})
export class DesenvolvedoresModule {}
