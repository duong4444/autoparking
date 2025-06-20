import { ValetAssignment } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ValetAssignmentEntity
  implements RestrictProperties<ValetAssignmentEntity, ValetAssignment>
{
  createdAt: Date;
  updatedAt: Date;
  bookingId: number;
  @IsOptional()
  pickupLat: number;
  @IsOptional()
  pickupLng: number;
  @IsOptional()
  returnLat: number;
  @IsOptional()
  returnLng: number;
  @IsOptional()
  pickupValetId: string;
  @IsOptional()
  returnValetId: string;
}
