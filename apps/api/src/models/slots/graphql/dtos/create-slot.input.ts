import { InputType, PickType } from '@nestjs/graphql'
import { Slot } from '../entity/slot.entity'

@InputType()
export class CreateSlotInput extends PickType(Slot,[],InputType) {}

