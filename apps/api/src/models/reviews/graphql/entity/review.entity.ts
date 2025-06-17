import { ObjectType } from '@nestjs/graphql'
import { Review as ReviewType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Review implements RestrictProperties<Review,ReviewType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
