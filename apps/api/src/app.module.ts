import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './models/admins/admins.module';
import { ManagersModule } from './models/managers/managers.module';
import { ValetsModule } from './models/valets/valets.module';
import { CustomersModule } from './models/customers/customers.module';
import { AddressesModule } from './models/addresses/addresses.module';
import { BookingsModule } from './models/bookings/bookings.module';
import { CompaniesModule } from './models/companies/companies.module';
import { GaragesModule } from './models/garages/garages.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { SlotsModule } from './models/slots/slots.module';
import { ValetAssignmentsModule } from './models/valet-assignments/valet-assignments.module';
import { VerificationsModule } from './models/verifications/verifications.module';
import { BookingTimelinesModule } from './models/booking-timelines/booking-timelines.module';
import { StripeModule } from './models/stripe/stripe.module';

// ROOT MODULE

// imports: các module khác cần dùng
// controllers: các controller xứ lý req
// providers: các service,guard,pipe,resolver,...

// autoSchemaFile: auto gen schema graphql từ code ts(decorator-based) rồi ghi ra file schema.gql
// buildSchemaOptions: config cách xly kiểu number trong schema (default là float)

const MAX_AGE = 24 * 60 * 60;

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // buildSchemaOptions: {
      //   numberScalarMode: 'integer',
      // },
    }),
    PrismaModule,
    StripeModule,
    UsersModule,
    AdminsModule,
    ManagersModule,
    ValetsModule,
    CustomersModule,
    AddressesModule,
    BookingsModule,
    BookingTimelinesModule,
    CompaniesModule,
    GaragesModule,
    ReviewsModule,
    SlotsModule,
    ValetAssignmentsModule,
    VerificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
