import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { VerificationsService } from './verifications.service'
import { Verification } from './entity/verification.entity'
import { FindManyVerificationArgs, FindUniqueVerificationArgs } from './dtos/find.args'
import { CreateVerificationInput } from './dtos/create-verification.input'
import { UpdateVerificationInput } from './dtos/update-verification.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Verification)
export class VerificationsResolver {
  constructor(private readonly verificationsService: VerificationsService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Verification)
  createVerification(@Args('createVerificationInput') args: CreateVerificationInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.verificationsService.create(args)
  }

  @Query(() => [Verification], { name: 'verifications' })
  findAll(@Args() args: FindManyVerificationArgs) {
    return this.verificationsService.findAll(args)
  }

  @Query(() => Verification, { name: 'verification' })
  findOne(@Args() args: FindUniqueVerificationArgs) {
    return this.verificationsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Verification)
  async updateVerification(@Args('updateVerificationInput') args: UpdateVerificationInput, @GetUser() user: GetUserType) {
    const verification = await this.prisma.verification.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, verification.uid)
    return this.verificationsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Verification)
  async removeVerification(@Args() args: FindUniqueVerificationArgs, @GetUser() user: GetUserType) {
    const verification = await this.prisma.verification.findUnique(args)
    checkRowLevelPermission(user, verification.uid)
    return this.verificationsService.remove(args)
  }
}
