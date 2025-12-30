import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLinkDto, UpdateProfileDto } from './dto/affiliate.dto';

@Injectable()
export class AffiliateService {
  constructor(private readonly prisma: PrismaService) {}

  // ============ DASHBOARD / STATS ============

  async getStats(affiliateId: string) {
    const [totalVisits, totalCommissions, pendingCommissions, approvedCommissions] = await Promise.all([
      this.prisma.affiliateVisit.count({ where: { affiliateId } }),
      this.prisma.affiliateCommission.aggregate({
        where: { affiliateId, status: { in: ['approved', 'paid'] } },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.affiliateCommission.aggregate({
        where: { affiliateId, status: 'pending' },
        _sum: { amount: true },
      }),
      this.prisma.affiliateCommission.aggregate({
        where: { affiliateId, status: 'approved' },
        _sum: { amount: true },
      }),
    ]);

    const conversions = totalCommissions._count;
    const conversionRate = totalVisits > 0 ? ((conversions / totalVisits) * 100).toFixed(2) : '0.00';

    return {
      totalVisits,
      totalConversions: conversions,
      conversionRate,
      totalCommissions: Number(totalCommissions._sum.amount || 0),
      pendingCommissions: Number(pendingCommissions._sum.amount || 0),
      approvedCommissions: Number(approvedCommissions._sum.amount || 0),
    };
  }

  // ============ LINKS ============

  async getLinks(affiliateId: string) {
    return this.prisma.affiliateLink.findMany({
      where: { affiliateId },
      include: {
        product: {
          select: {
            id: true,
            code: true,
            name: true,
            logoUrl: true,
            commissionRate: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLink(affiliateId: string, dto: CreateLinkDto) {
    // Verifica se produto existe
    const product = await this.prisma.saaSProduct.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Verifica se já existe link para este produto
    const existingLink = await this.prisma.affiliateLink.findFirst({
      where: { affiliateId, productId: dto.productId },
    });

    if (existingLink) {
      throw new BadRequestException('Você já tem um link para este produto');
    }

    // Gera código único
    const code = await this.generateUniqueLinkCode();

    // Cria o link
    return this.prisma.affiliateLink.create({
      data: {
        affiliateId,
        productId: dto.productId,
        code,
        customSlug: dto.customSlug,
        targetUrl: `${product.checkoutUrl || product.baseUrl}?ref=${code}`,
      },
      include: {
        product: {
          select: {
            id: true,
            code: true,
            name: true,
            logoUrl: true,
            commissionRate: true,
          },
        },
      },
    });
  }

  async deleteLink(affiliateId: string, linkId: string) {
    const link = await this.prisma.affiliateLink.findFirst({
      where: { id: linkId, affiliateId },
    });

    if (!link) {
      throw new NotFoundException('Link não encontrado');
    }

    await this.prisma.affiliateLink.delete({ where: { id: linkId } });

    return { message: 'Link removido com sucesso' };
  }

  private async generateUniqueLinkCode(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 10) {
      code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const found = await this.prisma.affiliateLink.findUnique({ where: { code } });
      exists = !!found;
      attempts++;
    }

    return code;
  }

  // ============ COMISSÕES ============

  async getCommissions(affiliateId: string, status?: string) {
    const where: any = { affiliateId };
    if (status) where.status = status;

    return this.prisma.affiliateCommission.findMany({
      where,
      include: {
        link: {
          include: {
            product: {
              select: { name: true, logoUrl: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ============ PERFIL ============

  async getProfile(affiliateId: string) {
    return this.prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpfCnpj: true,
        pixKey: true,
        pixKeyType: true,
        bankName: true,
        bankAgency: true,
        bankAccount: true,
        referralCode: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(affiliateId: string, dto: UpdateProfileDto) {
    return this.prisma.affiliate.update({
      where: { id: affiliateId },
      data: {
        name: dto.name,
        phone: dto.phone,
        pixKey: dto.pixKey,
        pixKeyType: dto.pixKeyType,
        bankName: dto.bankName,
        bankAgency: dto.bankAgency,
        bankAccount: dto.bankAccount,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        pixKey: true,
        pixKeyType: true,
        bankName: true,
        bankAgency: true,
        bankAccount: true,
      },
    });
  }

  // ============ SAQUES ============

  async getWithdrawals(affiliateId: string) {
    return this.prisma.affiliateWithdrawal.findMany({
      where: { affiliateId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async requestWithdrawal(affiliateId: string, amount: number) {
    // Verifica saldo disponível (comissões aprovadas não sacadas)
    const stats = await this.getStats(affiliateId);
    
    if (amount > stats.approvedCommissions) {
      throw new BadRequestException('Saldo insuficiente para saque');
    }

    // Verifica dados de pagamento
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id: affiliateId },
    });

    if (!affiliate) {
      throw new BadRequestException('Afiliado não encontrado');
    }

    if (!affiliate.pixKey) {
      throw new BadRequestException('Configure sua chave PIX antes de solicitar um saque');
    }

    // Cria solicitação de saque
    return this.prisma.affiliateWithdrawal.create({
      data: {
        affiliateId,
        amount,
        method: 'pix',
        pixKey: affiliate.pixKey,
        status: 'pending',
      },
    });
  }
}

