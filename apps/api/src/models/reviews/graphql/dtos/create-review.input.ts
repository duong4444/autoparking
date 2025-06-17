import { InputType, PickType } from '@nestjs/graphql'
import { Review } from '../entity/review.entity'

@InputType()
export class CreateReviewInput extends PickType(Review,[],InputType) {}

