import { Field, ObjectType } from '@nestjs/graphql'
import { ValetAssignment as ValetAssignmentType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ValetAssignment implements RestrictProperties<ValetAssignment,ValetAssignmentType> {
    createdAt: Date
    updatedAt: Date
    bookingId: number
    @Field({ nullable: true })
    pickupLat: number
    @Field({ nullable: true })
    pickupLng: number
    @Field({ nullable: true })
    returnLat: number
    @Field({ nullable: true })
    returnLng: number
    @Field({ nullable: true })
    pickupValetId: string
    @Field({ nullable: true })
    returnValetId: string
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
