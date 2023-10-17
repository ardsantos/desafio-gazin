import { Prisma } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ErrorMessages } from 'src/common/errorMessages';
import { sexoEnum } from '../utils/types';

export class FindAllDesenvolvedoresDto extends PaginationQueryDto<Prisma.DesenvolvedorOrderByWithRelationInput> {
  @IsString({ message: ErrorMessages.string('nome') })
  @IsOptional()
  nome?: string;

  @IsEnum(sexoEnum, { message: ErrorMessages.enum('sexo', sexoEnum) })
  @IsOptional()
  sexo?: string;

  @IsDateString({}, { message: ErrorMessages.date('dataNascimento') })
  @IsOptional()
  dataNascimento?: Date;

  @IsString({ message: ErrorMessages.string('hobby') })
  @IsOptional()
  hobby?: string;

  @IsString({ message: ErrorMessages.string('nivel') })
  @IsOptional()
  nivel?: string;
}
