import { ObjectType } from '@nestjs/graphql'
import { Booking as BookingType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Booking implements RestrictProperties<Booking,BookingType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
