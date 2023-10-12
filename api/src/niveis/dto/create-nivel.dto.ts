import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/errorMessages';

export class CreateNivelDto {
  @IsString({ message: ErrorMessages.string('nivel') })
  @IsNotEmpty({ message: ErrorMessages.required('nivel') })
  nivel: string;
}
