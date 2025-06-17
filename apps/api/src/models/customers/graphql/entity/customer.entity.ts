import { ObjectType } from '@nestjs/graphql'
import { Customer as CustomerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Customer implements RestrictProperties<Customer,CustomerType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
