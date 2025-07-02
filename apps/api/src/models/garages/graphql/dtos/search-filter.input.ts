import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { FindManyGarageArgs } from './find.args'
import { Slot } from 'src/models/slots/graphql/entity/slot.entity'

@InputType()
export class DateFilterInput {
  start: string
  end: string
}
// input DateFilterInput {
//   start: String!
//   end: String!
// }

@InputType()
export class GarageFilter extends PickType(
  FindManyGarageArgs,
  ['where', 'orderBy', 'skip', 'take'],
  InputType,
) {}

@ObjectType()
export class MinimalSlotGroupBy extends PickType(Slot, [
  'type',
  'pricePerHour',
]) {
  count: number
}

// @InputType()
// export class LocationFilterInput {
//   @Field(() => Float)
//   ne_lat: number;

//   @Field(() => Float)
//   ne_lng: number;

//   @Field(() => Float)
//   sw_lat: number;

//   @Field(() => Float)
//   sw_lng: number;
// }

// input LocationFilterInput {
//   ne_lat: Float!
//   ne_lng: Float!
//   sw_lat: Float!
//   sw_lng: Float!
// }