import { ObjectType } from '@nestjs/graphql'
import { Valet as ValetType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Valet implements RestrictProperties<Valet,ValetType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
