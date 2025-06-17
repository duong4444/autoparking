import { ObjectType } from '@nestjs/graphql'
import { Slot as SlotType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Slot implements RestrictProperties<Slot,SlotType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
