import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class GarageWhereUniqueInput {
  id: number
}

@InputType()
export class GarageWhereInputStrict implements RestrictProperties<GarageWhereInputStrict, Prisma.GarageWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: GarageWhereInput[]
  OR: GarageWhereInput[]
  NOT: GarageWhereInput[]
}

@InputType()
export class GarageWhereInput extends PartialType(
  GarageWhereInputStrict,
) {}

@InputType()
export class GarageListRelationFilter {
  every?: GarageWhereInput
  some?: GarageWhereInput
  none?: GarageWhereInput
}

@InputType()
export class GarageRelationFilter {
  is?: GarageWhereInput
  isNot?: GarageWhereInput
}
