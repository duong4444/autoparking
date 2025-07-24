import Stripe from 'stripe';

import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe-session.dto';
import { toTitleCase } from 'src/common/utils';

@Injectable()
export default class StripeService {
  public stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });
  }

  // export type TotalPrice = {
  //   parkingCharge: number
  //   valetChargeDropoff: number
  //   valetChargePickup: number
  // }
  async createStripeSession({
    totalPriceObj,
    uid,
    bookingData,
  }: CreateStripeDto) {
    // gọi stripe.checkout.sessions.create để tạo một phiên thanh toán
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // line_items: Danh sách các mục thanh toán (items) mà người dùng sẽ trả tiền.
      line_items: Object.entries(totalPriceObj) // chuyển đồi obj thành mảng [key,value]
        .filter(([, price]) => price > 0)
        .map(([name, price]) => ({
          // tạo các mục line_items cho Stripe
          quantity: 1,
          price_data: {
            product_data: {
              name: toTitleCase(name),
            },
            currency: 'usd',
            unit_amount: price * 100, // vì giá tính bằng cent
          },
        })),
      mode: 'payment',
      // STRIPE_SUCCESS_URL=http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}
      success_url: process.env.STRIPE_SUCCESS_URL,
      // STRIPE_CANCEL_URL=http://localhost:5000/booking-failed
      cancel_url: process.env.STRIPE_CANCEL_URL,
      // dữ liệu bổ sung gắn vs phiên thanh toán
      metadata: {
        uid, // lưu id user để link user vs giao dịch
        bookingData: JSON.stringify(bookingData),
      },
    });
    // trả về obj chứa sessionId, id này đc dùng ở FE để direct user tới thanh toán của stripe
    return { sessionId: session.id };
  }
}
