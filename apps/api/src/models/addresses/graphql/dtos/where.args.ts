import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class AddressWhereUniqueInput {
  id: number
}

@InputType()
export class AddressWhereInputStrict implements RestrictProperties<AddressWhereInputStrict, Prisma.AddressWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: AddressWhereInput[]
  OR: AddressWhereInput[]
  NOT: AddressWhereInput[]
}

@InputType()
export class AddressWhereInput extends PartialType(
  AddressWhereInputStrict,
) {}

@InputType()
export class AddressListRelationFilter {
  every?: AddressWhereInput
  some?: AddressWhereInput
  none?: AddressWhereInput
}

@InputType()
export class AddressRelationFilter {
  is?: AddressWhereInput
  isNot?: AddressWhereInput
}
