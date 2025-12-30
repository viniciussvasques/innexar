import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../database/prisma.service";
import {
  UpdateAffiliateProfileDto,
  AffiliateDashboardStatsDto,
} from "./dto/affiliate-portal.dto";

@Injectable()
export class AffiliatePortalService {
  constructor(private prisma: PrismaService) { }

  async getStats(affiliateId: string): Promise<AffiliateDashboardStatsDto> {
    const totalCommissions = await this.prisma.affiliateCommission.aggregate({
      where: { affiliateId, status: "approved" },
      _sum: { amount: true },
    });

    const totalVisits = await this.prisma.affiliateVisit.count({
      where: { affiliateId },
    });

    const totalConversions = await this.prisma.affiliateCommission.count({
      where: { affiliateId },
    });

    const conversionRate =
      totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;

    return {
      totalCommissions: Number(totalCommissions._sum.amount) || 0,
      totalVisits,
      totalConversions,
      conversionRate: Number(conversionRate.toFixed(2)),
    };
  }

  async getLinks(affiliateId: string) {
    return this.prisma.affiliateLink.findMany({
      where: { affiliateId },
      include: {
        product: true,
        _count: {
          select: {
            visits: true,
            commissions: true,
          },
        },
      },
    });
  }

  async getAvailableProducts() {
    return this.prisma.saaSProduct.findMany({
      where: { isActive: true },
    });
  }

  async updateProfile(affiliateId: string, dto: UpdateAffiliateProfileDto) {
    return this.prisma.affiliate.update({
      where: { id: affiliateId },
      data: dto,
    });
  }

  async getProfile(affiliateId: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id: affiliateId },
    });

    if (!affiliate) {
      throw new NotFoundException("Afiliado não encontrado");
    }

    return affiliate;
  }

  async getAffiliateByUserId(userId: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { userId },
    });

    if (!affiliate) {
      throw new NotFoundException(
        "Perfil de afiliado não encontrado para este usuário",
      );
    }

    return affiliate;
  }
}
