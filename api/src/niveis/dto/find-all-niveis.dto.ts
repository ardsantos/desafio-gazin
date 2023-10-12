import { PickType } from '@nestjs/mapped-types';
import { UpdateNivelDto } from './update-nivel.dto';

export class FindAllNiveisDto extends PickType(UpdateNivelDto, ['nivel']) {}
