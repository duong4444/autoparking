import { ObjectType } from '@nestjs/graphql'
import { Garage as GarageType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Garage implements RestrictProperties<Garage,GarageType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
