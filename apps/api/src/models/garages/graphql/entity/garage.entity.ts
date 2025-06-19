import { Field, ObjectType } from '@nestjs/graphql';
import { Garage as GarageType, SlotType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Garage implements RestrictProperties<Garage, GarageType> {
  @Field({ nullable: true })
  description: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  @Field({ nullable: true })
  displayName: string;
  companyId: number;
  images: string[];
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}

@ObjectType()
export class SlotTypeCount {
  @Field(() => SlotType)
  type: SlotType
  count?: number
}
