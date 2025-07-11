import { Field, InputType, PartialType, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { BookingTimelineOrderByRelationAggregateInput } from 'src/models/booking-timelines/graphql/dtos/order-by.args';
import { CompanyOrderByWithRelationInput } from 'src/models/companies/graphql/dtos/order-by.args';
import { UserOrderByWithRelationInput } from 'src/models/users/graphql/dtos/order-by.args';

registerEnumType(Prisma.SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class ManagerOrderByWithRelationInputStrict
  implements RestrictProperties<ManagerOrderByWithRelationInputStrict, Prisma.ManagerOrderByWithRelationInput>
{ 
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  companyId: Prisma.SortOrder

  User: UserOrderByWithRelationInput
  Company: CompanyOrderByWithRelationInput
  BookingTimeLine: BookingTimelineOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ManagerOrderByWithRelationInput extends PartialType(
  ManagerOrderByWithRelationInputStrict,
) {}

@InputType()
export class ManagerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
