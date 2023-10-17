import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ErrorMessages } from 'src/common/errorMessages';

export class FindAllNiveisDto extends PaginationQueryDto<Prisma.NivelOrderByWithRelationInput> {
  @IsString({ message: ErrorMessages.string('nivel') })
  @IsOptional()
  nivel?: string;
}
