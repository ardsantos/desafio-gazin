import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { FindAllNiveisDto } from './dto/find-all-niveis.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { NiveisService } from './niveis.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('niveis')
export class NiveisController {
  constructor(private readonly niveisService: NiveisService) {}

  @Post()
  create(@Body() createNivelDto: CreateNivelDto) {
    return this.niveisService.create(createNivelDto);
  }

  @Get()
  findAll(@Query() query: FindAllNiveisDto) {
    return this.niveisService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveisService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(201)
  update(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto) {
    return this.niveisService.update(+id, updateNivelDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.niveisService.remove(+id);
  }
}
