import { $Enums, Slot } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class SlotEntity implements RestrictProperties<SlotEntity, Slot> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  displayName: string;
  @IsOptional()
  length: number;
  type: $Enums.SlotType;
  garageId: number;
  pricePerHour: number;
  @IsOptional()
  width: number;
  @IsOptional()
  height: number;
}
