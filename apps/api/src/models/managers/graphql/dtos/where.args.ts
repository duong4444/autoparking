import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { IntFilter, RestrictProperties, StringFilter } from 'src/common/dtos/common.input'
import { BookingTimelineListRelationFilter } from 'src/models/booking-timelines/graphql/dtos/where.args'
import { CompanyRelationFilter } from 'src/models/companies/graphql/dtos/where.args'
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args'

@InputType()
export class ManagerWhereUniqueInput {
  uid: string
}

@InputType()
export class ManagerWhereInputStrict implements RestrictProperties<ManagerWhereInputStrict, Prisma.ManagerWhereInput> {
  uid: StringFilter
  createdAt: StringFilter
  updatedAt: StringFilter
  displayName: StringFilter
  companyId: IntFilter
  User: UserRelationFilter
  Company: CompanyRelationFilter
  BookingTimeLine: BookingTimelineListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ManagerWhereInput[]
  OR: ManagerWhereInput[]
  NOT: ManagerWhereInput[]
}

@InputType()
export class ManagerWhereInput extends PartialType(
  ManagerWhereInputStrict,
) {}

@InputType()
export class ManagerListRelationFilter {
  every?: ManagerWhereInput
  some?: ManagerWhereInput
  none?: ManagerWhereInput
}

@InputType()
export class ManagerRelationFilter {
  is?: ManagerWhereInput
  isNot?: ManagerWhereInput
}
