import { ObjectType } from '@nestjs/graphql'
import { Verification as VerificationType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Verification implements RestrictProperties<Verification,VerificationType> {
    createdAt: Date
    garageId: number
    updated: Date
    verified: boolean
    adminId: string
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
