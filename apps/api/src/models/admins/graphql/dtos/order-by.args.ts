import { Field, InputType, PartialType, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { UserOrderByWithRelationInput } from 'src/models/users/graphql/dtos/order-by.args';
import { VerificationOrderByRelationAggregateInput } from 'src/models/verifications/graphql/dtos/order-by.args';

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class AdminOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      AdminOrderByWithRelationInputStrict,
      Prisma.AdminOrderByWithRelationInput
    >
{ 
   @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder;
   @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
   @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
   @Field(() => Prisma.SortOrder)
  User: UserOrderByWithRelationInput;
  Verifications: VerificationOrderByRelationAggregateInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class AdminOrderByWithRelationInput extends PartialType(
  AdminOrderByWithRelationInputStrict,
) {}

@InputType()
export class AdminOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
