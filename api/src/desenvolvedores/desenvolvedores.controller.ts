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
import { DesenvolvedoresService } from './desenvolvedores.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { FindAllDesenvolvedoresDto } from './dto/find-all-desenvolvedores.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('desenvolvedores')
export class DesenvolvedoresController {
  constructor(
    private readonly desenvolvedoresService: DesenvolvedoresService,
  ) {}

  @Post()
  create(@Body() createDesenvolvedorDto: CreateDesenvolvedorDto) {
    return this.desenvolvedoresService.create(createDesenvolvedorDto);
  }

  @Get()
  findAll(@Query() query: FindAllDesenvolvedoresDto) {
    return this.desenvolvedoresService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desenvolvedoresService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(201)
  update(
    @Param('id') id: string,
    @Body() updateDesenvolvedorDto: UpdateDesenvolvedorDto,
  ) {
    return this.desenvolvedoresService.update(+id, updateDesenvolvedorDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.desenvolvedoresService.remove(+id);
  }
}
