import { $Enums, Booking } from '@prisma/client'
import { IsDate, IsString, IsInt,IsOptional } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class BookingEntity implements RestrictProperties<BookingEntity, Booking> {
    customerId: string
    startTime: Date
    endTime: Date
    vehicleNumber: string
    @IsOptional()
    phoneNumber: string
    id: number
    createdAt: Date
    updatedAt: Date
    @IsOptional()
    pricePerHour: number
    status: $Enums.BookingStatus
    @IsOptional()
    totalPrice: number
    @IsOptional()
    passcode: string
    slotId: number

}

