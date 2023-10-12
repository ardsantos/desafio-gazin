import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ErrorMessages } from 'src/common/errorMessages';
import { sexoEnum } from '../utils/types';

export class CreateDesenvolvedorDto {
  @IsNumber({}, { message: ErrorMessages.number('nivelId') })
  @IsNotEmpty({ message: ErrorMessages.required('nivelId') })
  nivelId: number;

  @IsString({ message: ErrorMessages.string('nome') })
  @IsNotEmpty({ message: ErrorMessages.required('nome') })
  nome: string;

  @IsEnum(sexoEnum, { message: ErrorMessages.enum('sexo', sexoEnum) })
  @IsNotEmpty({ message: ErrorMessages.required('sexo') })
  sexo: string;

  @IsDateString({}, { message: ErrorMessages.date('dataNascimento') })
  @IsNotEmpty({ message: ErrorMessages.required('dataNascimento') })
  dataNascimento: Date;

  @IsString({ message: ErrorMessages.string('hobby') })
  @IsNotEmpty({ message: ErrorMessages.required('hobby') })
  hobby: string;
}
