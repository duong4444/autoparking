import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ValetAssignmentWhereUniqueInput {
  id: number
}

@InputType()
export class ValetAssignmentWhereInputStrict implements RestrictProperties<ValetAssignmentWhereInputStrict, Prisma.ValetAssignmentWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ValetAssignmentWhereInput[]
  OR: ValetAssignmentWhereInput[]
  NOT: ValetAssignmentWhereInput[]
}

@InputType()
export class ValetAssignmentWhereInput extends PartialType(
  ValetAssignmentWhereInputStrict,
) {}

@InputType()
export class ValetAssignmentListRelationFilter {
  every?: ValetAssignmentWhereInput
  some?: ValetAssignmentWhereInput
  none?: ValetAssignmentWhereInput
}

@InputType()
export class ValetAssignmentRelationFilter {
  is?: ValetAssignmentWhereInput
  isNot?: ValetAssignmentWhereInput
}
