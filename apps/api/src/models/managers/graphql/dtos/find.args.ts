import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ManagerOrderByWithRelationInput } from './order-by.args';
import { ManagerWhereInput, ManagerWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.ManagerScalarFieldEnum, {
  name: 'ManagerScalarFieldEnum',
});

@ArgsType()
class FindManyManagerArgsStrict
  implements
    RestrictProperties<
      FindManyManagerArgsStrict,
      Omit<Prisma.ManagerFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: ManagerWhereInput;
  orderBy: ManagerOrderByWithRelationInput[];
  cursor: ManagerWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.ManagerScalarFieldEnum])
  distinct: Prisma.ManagerScalarFieldEnum[];
  //   export const ManagerScalarFieldEnum: {
  //   uid: 'uid',
  //   createdAt: 'createdAt',
  //   updatedAt: 'updatedAt',
  //   displayName: 'displayName',
  //   companyId: 'companyId'
  // };
}

@ArgsType()
export class FindManyManagerArgs extends PartialType(
  FindManyManagerArgsStrict,
) {}

@ArgsType()
export class FindUniqueManagerArgs {
  where: ManagerWhereUniqueInput;
}
