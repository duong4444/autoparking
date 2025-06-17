import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ValetAssignmentOrderByWithRelationInputStrict
  implements RestrictProperties<ValetAssignmentOrderByWithRelationInputStrict, Prisma.ValetAssignmentOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ValetAssignmentOrderByWithRelationInput extends PartialType(
  ValetAssignmentOrderByWithRelationInputStrict,
) {}

@InputType()
export class ValetAssignmentOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
