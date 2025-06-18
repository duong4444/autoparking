import { Field, ObjectType } from '@nestjs/graphql';
import { Valet as ValetType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Valet implements RestrictProperties<Valet, ValetType> {
  createdAt: Date;
  updatedAt: Date;
  uid: string;
  displayName: string;
  @Field({ nullable: true })
  image: string;
  @Field({ nullable: true })
  companyId: number;
  licenceID: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
