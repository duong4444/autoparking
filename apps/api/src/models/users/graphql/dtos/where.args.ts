import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class UserWhereUniqueInput {
  uid: string;
}

@InputType()
export class UserWhereInputStrict
  implements
    RestrictProperties<
      UserWhereInputStrict,
      Omit<Prisma.UserWhereInput, 'Credentials' | 'AuthProvider' | 'Admin' | 'image'>
    >
{
  Manager: (Prisma.Without<Prisma.ManagerNullableScalarRelationFilter, Prisma.ManagerWhereInput> & Prisma.ManagerWhereInput) | (Prisma.Without<Prisma.ManagerWhereInput, Prisma.ManagerNullableScalarRelationFilter> & Prisma.ManagerNullableScalarRelationFilter) | null;
  Valet: (Prisma.Without<Prisma.ValetNullableScalarRelationFilter, Prisma.ValetWhereInput> & Prisma.ValetWhereInput) | (Prisma.Without<Prisma.ValetWhereInput, Prisma.ValetNullableScalarRelationFilter> & Prisma.ValetNullableScalarRelationFilter) | null;
  Customer: (Prisma.Without<Prisma.CustomerNullableScalarRelationFilter, Prisma.CustomerWhereInput> & Prisma.CustomerWhereInput) | (Prisma.Without<Prisma.CustomerWhereInput, Prisma.CustomerNullableScalarRelationFilter> & Prisma.CustomerNullableScalarRelationFilter) | null;
  uid: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  name: StringFilter;
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UserWhereInput[];
  OR: UserWhereInput[];
  NOT: UserWhereInput[];
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput;
  some?: UserWhereInput;
  none?: UserWhereInput;
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput;
  isNot?: UserWhereInput;
}
