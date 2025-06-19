import { Injectable } from '@nestjs/common';
import { FindManyGarageArgs, FindUniqueGarageArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateGarageInput } from './dtos/create-garage.input';
import { UpdateGarageInput } from './dtos/update-garage.input';
import { CreateSlotInputWithoutGarageId } from 'src/models/slots/graphql/dtos/create-slot.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class GaragesService {
  constructor(private readonly prisma: PrismaService) {}

  groupSlotsByType(
    // displayName,pricePerHour,length,width,height,type(enum) + count
    slots: CreateSlotInputWithoutGarageId[],
    garageId: number,
  ): Prisma.SlotCreateManyInput[] {
    // export type SlotCreateManyInput = {
    //   id?: number
    //   createdAt?: Date | string
    //   updatedAt?: Date | string
    //   displayName?: string | null
    //   pricePerHour: number
    //   length?: number | null
    //   width?: number | null
    //   height?: number | null
    //   type?: $Enums.SlotType
    //   garageId: number
    // }
    const slotsByType: Prisma.SlotCreateManyInput[] = [];
    const slotCounts = {
      CAR: 0,
      HEAVY: 0,
      BIKE: 0,
      BICYCLE: 0,
    };

    slots.forEach(({ count, ...slot }) => {
      for (let i = 0; i < count; i++) {
        slotsByType.push({
          ...slot, // price,length,width,type,height
          displayName: `${slot.type} ${slotCounts[slot.type]}`,
          garageId,
        });
        slotCounts[slot.type]++;
      }
    });

    return slotsByType;
  }

  async create({
    Address,
    companyId,
    description,
    displayName,
    images,
    Slots, //  lấy từ req body
  }: CreateGarageInput & { companyId: number }) {
    if (Slots.some((slot) => slot.count > 20)) {
      throw new Error('Slot count cannot be more than 20 for any slot type.');
    }
    // $transaction thực hiện đồng thời , roll back nếu 1 trong 2 lỗi
    // tx: transaction prisma client
    return this.prisma.$transaction(async (tx) => {
      const createdGarage = await tx.garage.create({
        data: {
          Address: { create: Address },
          companyId,
          description,
          displayName,
          images,
        },
      });
      // displayName,pricePerHour,length,width,height,type(enum) + count
      const slotsByType = this.groupSlotsByType(Slots, createdGarage.id);

      const createSlots = await tx.slot.createMany({
        data: slotsByType,
      });

      return createdGarage;
    });
  }

  findAll(args: FindManyGarageArgs) {
    return this.prisma.garage.findMany(args);
  }

  findOne(args: FindUniqueGarageArgs) {
    return this.prisma.garage.findUnique(args);
  }

  update(updateGarageInput: UpdateGarageInput) {
    const { id, Address, Slots, ...data } = updateGarageInput;
    return this.prisma.garage.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueGarageArgs) {
    return this.prisma.garage.delete(args);
  }
}
