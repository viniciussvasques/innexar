import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { ProductsModule } from './modules/products/products.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';
import { HealthModule } from './modules/health/health.module';
import { TeamModule } from './modules/team/team.module';
import { SupportModule } from './modules/support/support.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AffiliateModule,
    ProductsModule,
    AffiliatesModule,
    HealthModule,
    TeamModule,
    SupportModule,
    MarketingModule,
    BillingModule,
  ],
})
export class AppModule { }

