import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class VerificationWhereUniqueInput {
  id: number
}

@InputType()
export class VerificationWhereInputStrict implements RestrictProperties<VerificationWhereInputStrict, Prisma.VerificationWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: VerificationWhereInput[]
  OR: VerificationWhereInput[]
  NOT: VerificationWhereInput[]
}

@InputType()
export class VerificationWhereInput extends PartialType(
  VerificationWhereInputStrict,
) {}

@InputType()
export class VerificationListRelationFilter {
  every?: VerificationWhereInput
  some?: VerificationWhereInput
  none?: VerificationWhereInput
}

@InputType()
export class VerificationRelationFilter {
  is?: VerificationWhereInput
  isNot?: VerificationWhereInput
}
