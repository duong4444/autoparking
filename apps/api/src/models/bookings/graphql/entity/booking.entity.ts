import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { $Enums, Booking as BookingType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType($Enums.BookingStatus, {
  name: 'BookingStatus',
})

@ObjectType()
export class Booking implements RestrictProperties<Booking,BookingType> {
    id: number
    createdAt: Date
    updatedAt: Date
    customerId: string
    @Field({ nullable: true })
    pricePerHour: number
    @Field(() => $Enums.BookingStatus)
    status: $Enums.BookingStatus
    @Field({ nullable: true })
    totalPrice: number
    startTime: Date
    endTime: Date
    vehicleNumber: string
    @Field({ nullable: true })
    phoneNumber: string
    @Field({ nullable: true })
    passcode: string
    slotId: number
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
