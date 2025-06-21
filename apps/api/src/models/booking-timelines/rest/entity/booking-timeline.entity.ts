import { $Enums, BookingTimeline } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class BookingTimelineEntity
  implements RestrictProperties<BookingTimelineEntity, BookingTimeline>
{
  id: number;
  status: $Enums.BookingStatus;
  bookingId: number;
  timestamp: Date;
  @IsOptional()
  valetId: string;
  @IsOptional()
  managerId: string;
}
