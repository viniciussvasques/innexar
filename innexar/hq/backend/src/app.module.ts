import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { ProductsModule } from './modules/products/products.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AffiliateModule,
    ProductsModule,
    HealthModule,
  ],
})
export class AppModule {}

