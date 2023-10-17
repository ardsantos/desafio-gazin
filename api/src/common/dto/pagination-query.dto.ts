import { Exclude } from 'class-transformer';
import { IsInt, IsObject, IsOptional } from 'class-validator';
import { ErrorMessages } from '../errorMessages';

export function getPaginationQueryData<T>(
  paginationQueryDto: PaginationQueryDto<T>,
) {
  return {
    take: paginationQueryDto.take || 5,
    skip: paginationQueryDto.skip,
    orderBy: paginationQueryDto.sort,
  };
}

export abstract class PaginationQueryDto<T> {
  @IsOptional()
  @IsInt({
    message: ErrorMessages.number('skip'),
  })
  skip?: number;

  @IsOptional()
  @IsInt({
    message: ErrorMessages.number('take'),
  })
  take?: number;

  @IsOptional()
  @IsObject({
    message: ErrorMessages.object('sort'),
  })
  sort?: T;

  @Exclude()
  page?: number;
}
