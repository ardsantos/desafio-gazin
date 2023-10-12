import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/errorMessages';
import { UpdateDesenvolvedorDto } from './update-desenvolvedor.dto';

export class FindAllDesenvolvedoresDto extends PickType(
  UpdateDesenvolvedorDto,
  ['nome', 'sexo', 'dataNascimento', 'hobby'],
) {
  @IsString({ message: ErrorMessages.string('nivel') })
  @IsOptional()
  nivel?: string;
}
