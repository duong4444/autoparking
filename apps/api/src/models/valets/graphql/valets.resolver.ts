import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ValetsService } from './valets.service';
import { Valet } from './entity/valet.entity';
import { FindManyValetArgs, FindUniqueValetArgs } from './dtos/find.args';
import { CreateValetInput } from './dtos/create-valet.input';
import { UpdateValetInput } from './dtos/update-valet.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BadGatewayException } from '@nestjs/common';
import { ValetWhereInput } from './dtos/where.args';
import { Booking } from 'src/models/bookings/graphql/entity/booking.entity';
import { PaginationInput } from 'src/common/dtos/common.input';

@Resolver(() => Valet)
export class ValetsResolver {
  constructor(
    private readonly valetsService: ValetsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async createValet(
    @Args('createValetInput') args: CreateValetInput,
    @GetUser() user: GetUserType,
  ) {
    // tìm cpn gắn vs logged_in_manager
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    });

    if (!company) {
      throw new BadGatewayException('You do not have a company.');
    }
    return this.valetsService.create({ ...args, companyId: company.id });
  }

  @AllowAuthenticated('valet')
  @Query(() => [Booking], { name: 'valetPickups' })
  async valetPickups(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    // check logged_in_user có là valet ko?
    const valet = await this.valetsService.validValet(user.uid);
    return this.prisma.booking.findMany({
      skip,
      take,
      where: {
        // Slot của booking thuộc về garage của cpn của valet
        Slot: {
          Garage:
            valet?.companyId !== null
              ? { companyId: valet.companyId }
              : undefined,
        },
        // có pickupLat nhưng chưa có valet nào nhận
        ValetAssignment: {
          pickupLat: { not: undefined },
          pickupValetId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async valetPickupsTotal(@GetUser() user: GetUserType) {
    const valet = await this.valetsService.validValet(user.uid);
    return this.prisma.booking.count({
      where: {
        Slot: {
          Garage:
            valet?.companyId !== null
              ? { companyId: valet.companyId }
              : undefined,
        },
        ValetAssignment: {
          pickupLat: { not: undefined },
          pickupValetId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => [Booking], { name: 'valetDrops' })
  async valetDrops(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.valetsService.validValet(user.uid);

    return this.prisma.booking.findMany({
      skip,
      take,
      where: {
        Slot: {
          Garage:
            valet?.companyId !== null
              ? { companyId: valet.companyId }
              : undefined,
        },
        ValetAssignment: {
          // có returnLat nhưng chưa valet nào nhận
          returnLat: { not: null },
          returnValetId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async valetDropsTotal(@GetUser() user: GetUserType) {
    const valet = await this.valetsService.validValet(user.uid);
    return this.prisma.booking.count({
      where: {
        Slot: {
          Garage:
            valet?.companyId !== null
              ? { companyId: valet.companyId }
              : undefined,
        },
        ValetAssignment: {
          returnLat: { not: null },
          returnValetId: null,
        },
      },
    });
  }

  @Query(() => [Valet], { name: 'valets' })
  findAll(@Args() args: FindManyValetArgs) {
    return this.valetsService.findAll(args);
  }

  @Query(() => Valet, { name: 'valet' })
  findOne(@Args() args: FindUniqueValetArgs) {
    return this.valetsService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async updateValet(
    @Args('updateValetInput') args: UpdateValetInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, valet?.uid);
    return this.valetsService.update(args);
  }

  @AllowAuthenticated()
  @Query(() => Valet, { name: 'valetMe', nullable: true })
  valetMe(@GetUser() user: GetUserType) {
    // tìm logged_in_user trong bảng Valet
    return this.valetsService.findOne({ where: { uid: user.uid } });
  }

  @AllowAuthenticated('manager', 'admin')
  @Query(() => [Valet], { name: 'companyValets' })
  async companyValets(
    @Args() args: FindManyValetArgs,
    @GetUser() user: GetUserType,
  ) {
    // gọi trong web-manager
    // tìm cpn ứng vs logged_in_manager
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    });

    // return tất cả valet ứng vs cpn của manager
    return this.valetsService.findAll({
      ...args,
      where: { ...args.where, companyId: { equals: company?.id } },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async companyValetsTotal(
    @Args('where', { nullable: true }) where: ValetWhereInput,
    @GetUser() user: GetUserType,
  ) {
    // tìm cpn ứng vs manager
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    });

    // tổng số valet thuộc cpn của manager
    return this.prisma.valet.count({
      where: { ...where, companyId: { equals: company?.id } },
    });
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async removeValet(
    @Args() args: FindUniqueValetArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique(args);
    checkRowLevelPermission(user, valet?.uid);
    return this.valetsService.remove(args);
  }
}
