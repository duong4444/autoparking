import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ValetOrderByWithRelationInputStrict
  implements RestrictProperties<ValetOrderByWithRelationInputStrict, Prisma.ValetOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ValetOrderByWithRelationInput extends PartialType(
  ValetOrderByWithRelationInputStrict,
) {}

@InputType()
export class ValetOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
