import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NiveisModule } from './niveis/niveis.module';

@Module({
  imports: [NiveisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
