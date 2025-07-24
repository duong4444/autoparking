import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import StripeService from './stripe.service';
import { BookingsService } from '../bookings/graphql/bookings.service';
import { CreateStripeDto } from './dto/create-stripe-session.dto';
import { CreateBookingInput } from '../bookings/graphql/dtos/create-booking.input';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly bookingService: BookingsService,
  ) {}

  @Get()
  helloStripe() {
    return 'Hello Stripe';
  }

  // uid: string
  // totalPriceObj: TotalPrice
  // bookingData: CreateBookingInput
  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto);
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.');
    }
    console.log("session_id-stripe.controller: ",sessionId);
    
    // const session: Stripe.Response<Stripe.Checkout.Session> 
    // chứa thông tin như payment_status(ví dụ :'paid'),metadata,số tiền
    const session =
      await this.stripeService.stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata || typeof session.metadata.bookingData !== 'string') {
      throw new BadRequestException('Invalid session metadata.');
    }
    const { bookingData } = session.metadata;

    const bookingInput: CreateBookingInput = JSON.parse(bookingData);
    const newBooking = await this.bookingService.create(bookingInput);
    // BOOKINGS_REDIRECT_URL=http://localhost:5000/bookings
    res.redirect(process.env.BOOKINGS_REDIRECT_URL!);
  }
}
