import { InputType, OmitType } from '@nestjs/graphql';
import { Slot } from '../entity/slot.entity';

@InputType()
export class CreateSlotInput extends OmitType(
  Slot,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}
// displayName,pricePerHour,length,width,height,type(enum),garageId

@InputType()
export class CreateSlotInputWithoutGarageId extends OmitType(
  CreateSlotInput,
  ['garageId'],
  InputType,
) {
  count: number
}
// displayName,pricePerHour,length,width,height,type(enum) + count