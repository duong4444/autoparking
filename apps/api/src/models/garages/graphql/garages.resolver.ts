import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GaragesService } from './garages.service';
import { Garage, SlotTypeCount } from './entity/garage.entity';
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dtos/find.args';
import { CreateGarageInput } from './dtos/create-garage.input';
import { UpdateGarageInput } from './dtos/update-garage.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { Address } from 'src/models/addresses/graphql/entity/address.entity';
import { Company } from 'src/models/companies/graphql/entity/company.entity';
import { Slot } from 'src/models/slots/graphql/entity/slot.entity';
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity';
import { LocationFilterInput } from 'src/common/dtos/common.input';
import { SlotWhereInput } from 'src/models/slots/graphql/dtos/where.args';
import {
  DateFilterInput,
  GarageFilter,
  MinimalSlotGroupBy,
} from './dtos/search-filter.input';

@Resolver(() => Garage)
export class GaragesResolver {
  constructor(
    private readonly garagesService: GaragesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async createGarage(
    @Args('createGarageInput') args: CreateGarageInput, // des,displayName,images,address,slot
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.company.findFirst({
      where: { Managers: { some: { uid: user.uid } } },
    });
    // tìm company ứng với user_token
    if (!company?.id) {
      throw new BadRequestException('No company associated with manager id.');
    }
    return this.garagesService.create({ ...args, companyId: company.id });
  }

  @Query(() => [Garage], { name: 'garages' })
  findAll(@Args() args: FindManyGarageArgs) {
    return this.garagesService.findAll(args);
  }

  @Query(() => Garage, { name: 'garage' })
  findOne(@Args() args: FindUniqueGarageArgs) {
    return this.garagesService.findOne(args);
  }

  @Query(() => [Garage], { name: 'searchGarages' })
  async searchGarages(
    @Args('dateFilter') dateFilter: DateFilterInput,
    @Args('locationFilter') locationFilter: LocationFilterInput,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('garageFilter', { nullable: true }) args: GarageFilter,
  ) {
    const { start, end } = dateFilter;
    const { ne_lat, ne_lng, sw_lat, sw_lng } = locationFilter;

    let startDate = new Date(start); // từ user
    let endDate = new Date(end); // từ user
    const currentDate = new Date();

    const diffInSeconds = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000,
    );

    if (startDate.getTime() < currentDate.getTime()) {
      // Set startDate as current time
      startDate = new Date();
      const updatedEndDate = new Date(startDate);
      updatedEndDate.setSeconds(updatedEndDate.getSeconds() + diffInSeconds);
      endDate = updatedEndDate;
    }

    if (startDate.getTime() > endDate.getTime()) {
      throw new BadRequestException(
        'Start time should be earlier than the end time.',
      );
    }

    const { where = {}, ...garageFilters } = args || {};

    return this.prisma.garage.findMany({
      ...garageFilters,
      where: {
        ...where,
        Address: {
          lat: { lte: ne_lat, gte: sw_lat },
          lng: { lte: ne_lng, gte: sw_lng },
        },
        Slots: {
          some: {
            // at least 1 slot thoả mãn
            ...slotsFilter, // slot filter
            Bookings: {
              // ko booking trùng
              none: {
                OR: [
                  {
                    startTime: { lt: endDate },
                    endTime: { gt: startDate },
                  },
                  {
                    startTime: { gt: startDate },
                    endTime: { lt: endDate },
                  },
                ],
              },
            },
          },
        },
      },
    });
  }

  //@ObjectType()
  // export class SlotTypeCount {
  //   @Field(() => SlotType)
  //   type: SlotType
  //   count?: number
  // }
  @ResolveField(() => [SlotTypeCount])
  async slotCounts(@Parent() garage: Garage) {
    const slotCounts = await this.prisma.slot.groupBy({
      by: ['type'],
      where: {
        garageId: garage.id,
      },
      _count: {
        type: true,
      },
    });

    return slotCounts.map(({ type, _count }) => ({
      type,
      count: _count.type,
    }));
  }

  @ResolveField(() => [MinimalSlotGroupBy], {
    name: 'availableSlots', // field của @Parent , ko có name thì field name default là func name
  })
  async availableSlots(
    @Parent() garage: Garage,
    @Args('slotsFilter', { nullable: true }) slotsFilter: SlotWhereInput,
    @Args('dateFilter') dateFilter: DateFilterInput,
  ) {
    const { start, end } = dateFilter;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const groupBySlots = await this.prisma.slot.groupBy({
      by: ['type'],
      _count: { type: true },
      _min: { pricePerHour: true },
      where: {
        ...slotsFilter,
        garageId: { equals: garage.id },
        Bookings: {
          none: {
            OR: [
              {
                startTime: { lt: endDate },
                endTime: { gt: startDate },
              },
              {
                startTime: { gt: startDate },
                endTime: { lt: endDate },
              },
            ],
          },
        },
      },
    });

    return groupBySlots.map(({ _count, type, _min }) => ({
      type,
      count: _count.type,
      pricePerHour: _min.pricePerHour,
    }));
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async updateGarage(
    @Args('updateGarageInput') args: UpdateGarageInput,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.id },
      include: {
        Company: {
          include: {
            Managers: true,
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      garage?.Company.Managers.map((man) => man.uid),
    );
    return this.garagesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Garage)
  async removeGarage(
    @Args() args: FindUniqueGarageArgs,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.garage.findUnique({
      where: { id: args.where.id },
      include: {
        Company: {
          include: {
            Managers: true,
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      garage?.Company.Managers.map((man) => man.uid),
    );
    return this.garagesService.remove(args);
  }

  @ResolveField(() => Verification, { nullable: true })
  async verification(@Parent() parent: Garage) {
    return this.prisma.verification.findUnique({
      where: { garageId: parent.id },
    });
  }

  @ResolveField(() => Company)
  company(@Parent() garage: Garage) {
    return this.prisma.company.findFirst({ where: { id: garage.companyId } });
  }

  @ResolveField(() => Address, { nullable: true })
  address(@Parent() garage: Garage) {
    return this.prisma.address.findFirst({ where: { garageId: garage.id } });
  }

  @ResolveField(() => [Slot])
  slots(@Parent() garage: Garage) {
    return this.prisma.slot.findMany({ where: { garageId: garage.id } });
  }
}
