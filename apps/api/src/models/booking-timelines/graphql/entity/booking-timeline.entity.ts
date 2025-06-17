import { ObjectType } from '@nestjs/graphql'
import { BookingTimeline as BookingTimelineType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class BookingTimeline implements RestrictProperties<BookingTimeline,BookingTimelineType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
