import { Customer } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class CustomerEntity
  implements RestrictProperties<CustomerEntity, Customer>
{
  createdAt: Date;
  updatedAt: Date;
  uid: string;
  @IsOptional()
  displayName: string;
}
