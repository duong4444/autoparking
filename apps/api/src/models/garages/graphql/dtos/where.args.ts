import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { DateTimeFilter, IntFilter, RestrictProperties, StringFilter, StringListFilter } from 'src/common/dtos/common.input'
import { AddressRelationFilter } from 'src/models/addresses/graphql/dtos/where.args'
import { CompanyRelationFilter } from 'src/models/companies/graphql/dtos/where.args'
import { ReviewListRelationFilter } from 'src/models/reviews/graphql/dtos/where.args'
import { SlotListRelationFilter } from 'src/models/slots/graphql/dtos/where.args'
import { VerificationRelationFilter } from 'src/models/verifications/graphql/dtos/where.args'

@InputType()
export class GarageWhereUniqueInput {
  id: number
}

@InputType()
export class GarageWhereInputStrict implements RestrictProperties<GarageWhereInputStrict, Prisma.GarageWhereInput> {
  id: IntFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  displayName: StringFilter
  description: StringFilter
  images: StringListFilter
  companyId: IntFilter
  Company: CompanyRelationFilter
  Address: AddressRelationFilter
  Verification: VerificationRelationFilter
  Reviews: ReviewListRelationFilter
  Slots: SlotListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: GarageWhereInput[]
  OR: GarageWhereInput[]
  NOT: GarageWhereInput[]
}

@InputType()
export class GarageWhereInput extends PartialType(
  GarageWhereInputStrict,
) {}

// Example using every - finds companies where ALL garages have a displayName containing "Premium"
// const everyExample = {
//   Company: {
//     Garages: {
//       every: {
//         displayName: {
//           contains: "Premium"
//         }
//       }
//     }
//   }
// }

// Example using none - finds companies where NO garages have less than 10 slots
// const noneExample = {
//   Company: {
//     Garages: {
//       none: {
//         Slots: {
//           _count: {
//             lt: 10
//           }
//         }
//       }
//     }
//   }
// }

@InputType()
export class GarageListRelationFilter {
  every?: GarageWhereInput
  some?: GarageWhereInput
  none?: GarageWhereInput
}

@InputType()
export class GarageRelationFilter {
  is?: GarageWhereInput
  isNot?: GarageWhereInput
}
