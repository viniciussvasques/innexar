import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AffiliatePortalService } from "./affiliate-portal.service";
import { AffiliatePortalController } from "./affiliate-portal.controller";
import { AffiliateAuthController } from "./affiliate-auth.controller";
import { PrismaModule } from "../../../database/prisma.module";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // @ts-expect-error - useFactory return type compatibility
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>("jwt.secret");
        if (!secret) {
          throw new Error("JWT_SECRET não configurado");
        }
        const expiresIn = configService.get<string>("jwt.expiresIn") || "7d";
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AffiliatePortalController, AffiliateAuthController],
  providers: [AffiliatePortalService],
  exports: [AffiliatePortalService],
})
export class AffiliatePortalModule {}
