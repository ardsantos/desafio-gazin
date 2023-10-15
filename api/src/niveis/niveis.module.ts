import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NiveisController } from './niveis.controller';
import { NiveisService } from './niveis.service';

@Module({
  controllers: [NiveisController],
  providers: [NiveisService, PrismaService],
})
export class NiveisModule {}
