import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NiveisModule } from './niveis/niveis.module';
import { DesenvolvedoresModule } from './desenvolvedores/desenvolvedores.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [NiveisModule, DesenvolvedoresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
