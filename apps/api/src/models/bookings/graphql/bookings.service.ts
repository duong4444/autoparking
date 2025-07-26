import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyBookingArgs, FindUniqueBookingArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookingInput } from './dtos/create-booking.input';
import { UpdateBookingInput } from './dtos/update-booking.input';
import { generateSixDigitNumber } from 'src/common/utils';
import { SlotType } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    customerId,
    startTime,
    endTime,
    garageId,
    type,
    vehicleNumber,
    phoneNumber,
    pricePerHour,
    totalPrice,
    valetAssignment,
  }: CreateBookingInput) {
    const customer = await this.prisma.customer.findUnique({
      where: { uid: customerId },
    });

    if (!customer?.uid) {
      await this.prisma.customer.create({
        data: { uid: customerId },
      });
    }

    const passcode = generateSixDigitNumber().toString();

    const startDate =
      typeof startTime === 'string' ? new Date(startTime) : startTime;
    const endDate = typeof endTime === 'string' ? new Date(endTime) : endTime;

    const slot = await this.getFreeSlot({
      endTime: endDate,
      startTime: startDate,
      garageId,
      type,
    });

    if (!slot) {
      throw new NotFoundException('No slots found.');
    }

    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          endTime: new Date(endTime).toISOString(),
          startTime: new Date(startTime).toISOString(),
          vehicleNumber,
          customerId,
          phoneNumber,
          passcode,
          slotId: slot.id,
          pricePerHour,
          totalPrice,
          ...(valetAssignment
            // thêm data vào bảng ValetAssignment
            ? { ValetAssignment: { create: valetAssignment } }
            : null),
        },
      });
      await tx.bookingTimeline.create({
        data: { bookingId: booking.id, status: 'BOOKED' },
      });
      return booking;
    });
  }

  getFreeSlot({
    garageId,
    startTime,
    endTime,
    type,
  }: {
    garageId: number;
    startTime: string | Date;
    endTime: string | Date;
    type: SlotType;
  }) {
    return this.prisma.slot.findFirst({
      where: {
        garageId: garageId,
        type: type,
        //lấy slot mà booking không trùng tgian
        Bookings: {
          none: {
            OR: [
              { startTime: { lt: endTime }, endTime: { gt: startTime } },
              { startTime: { gt: startTime }, endTime: { lt: endTime } },
            ],
          },
        },
      },
    });
  }

  findAll(args: FindManyBookingArgs) {
    return this.prisma.booking.findMany(args);
  }

  findOne(args: FindUniqueBookingArgs) {
    return this.prisma.booking.findUnique(args);
  }

  update(updateBookingInput: UpdateBookingInput) {
    const { id, ...data } = updateBookingInput;
    return this.prisma.booking.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueBookingArgs) {
    return this.prisma.booking.delete(args);
  }
}
