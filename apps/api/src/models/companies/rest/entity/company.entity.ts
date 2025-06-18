import { Company } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class CompanyEntity
  implements RestrictProperties<CompanyEntity, Company>
{
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  displayName: string;
  id: number;
  @IsOptional()
  description: string;
}
