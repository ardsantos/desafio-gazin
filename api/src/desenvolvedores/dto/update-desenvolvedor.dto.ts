import { PartialType } from '@nestjs/mapped-types';
import { CreateDesenvolvedorDto } from './create-desenvolvedor.dto';

export class UpdateDesenvolvedorDto extends PartialType(
  CreateDesenvolvedorDto,
) {}
