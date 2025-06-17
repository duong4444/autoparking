import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class SlotWhereUniqueInput {
  id: number
}

@InputType()
export class SlotWhereInputStrict implements RestrictProperties<SlotWhereInputStrict, Prisma.SlotWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: SlotWhereInput[]
  OR: SlotWhereInput[]
  NOT: SlotWhereInput[]
}

@InputType()
export class SlotWhereInput extends PartialType(
  SlotWhereInputStrict,
) {}

@InputType()
export class SlotListRelationFilter {
  every?: SlotWhereInput
  some?: SlotWhereInput
  none?: SlotWhereInput
}

@InputType()
export class SlotRelationFilter {
  is?: SlotWhereInput
  isNot?: SlotWhereInput
}
