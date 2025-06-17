import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class BookingWhereUniqueInput {
  id: number
}

@InputType()
export class BookingWhereInputStrict implements RestrictProperties<BookingWhereInputStrict, Prisma.BookingWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: BookingWhereInput[]
  OR: BookingWhereInput[]
  NOT: BookingWhereInput[]
}

@InputType()
export class BookingWhereInput extends PartialType(
  BookingWhereInputStrict,
) {}

@InputType()
export class BookingListRelationFilter {
  every?: BookingWhereInput
  some?: BookingWhereInput
  none?: BookingWhereInput
}

@InputType()
export class BookingRelationFilter {
  is?: BookingWhereInput
  isNot?: BookingWhereInput
}
