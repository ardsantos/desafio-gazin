import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { NiveisService } from './niveis.service';

@Controller('niveis')
export class NiveisController {
  constructor(private readonly niveisService: NiveisService) {}

  @Post()
  create(@Body() createNivelDto: CreateNivelDto) {
    return this.niveisService.create(createNivelDto);
  }

  @Get()
  findAll() {
    return this.niveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto) {
    return this.niveisService.update(+id, updateNivelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.niveisService.remove(+id);
  }
}
