import { InputType, PickType } from '@nestjs/graphql'
import { ValetAssignment } from '../entity/valet-assignment.entity'

@InputType()
export class CreateValetAssignmentInput extends PickType(ValetAssignment,[],InputType) {}

