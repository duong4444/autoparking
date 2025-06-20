import { InputType, OmitType } from '@nestjs/graphql';
import { ValetAssignment } from '../entity/valet-assignment.entity';

@InputType()
export class CreateValetAssignmentInput extends OmitType(
  ValetAssignment,
  ['createdAt', 'updatedAt'],
  InputType,
) {}
// bookingId,pickupLat,pickupLng,returnLat,returnLng,pickupValetId,returnValetId

@InputType()
export class CreateValetAssignmentInputWithoutBookingId {
  pickupLat: number;
  pickupLng: number;
  returnLat?: number;
  returnLng?: number;
}
