import { TotalPrice } from '@autospace/util/types'
import { CreateBookingInput } from 'src/models/bookings/graphql/dtos/create-booking.input'

export class CreateStripeDto {
  uid: string
  totalPriceObj: TotalPrice
  bookingData: CreateBookingInput
}

// export type TotalPrice = {
//   parkingCharge: number
//   valetChargeDropoff: number
//   valetChargePickup: number
// }

// input CreateBookingInput {
//   phoneNumber: String
//   customerId: String!
//   startTime: DateTime!
//   endTime: DateTime!
//   vehicleNumber: String!
//   type: SlotType!
//   pricePerHour: Float
//   totalPrice: Float
//   garageId: Float!
//   valetAssignment: CreateValetAssignmentInputWithoutBookingId
// }
