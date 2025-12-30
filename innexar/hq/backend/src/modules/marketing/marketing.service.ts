import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MarketingService {
    constructor(private prisma: PrismaService) { }

    async findAllCampaigns() {
        return this.prisma.campaign.findMany({
            include: {
                _count: {
                    select: { leads: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOneCampaign(id: string) {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: {
                leads: true,
            },
        });

        if (!campaign) {
            throw new NotFoundException('Campanha não encontrada');
        }

        return campaign;
    }

    async createCampaign(data: Prisma.CampaignCreateInput) {
        return this.prisma.campaign.create({
            data,
        });
    }

    async updateCampaign(id: string, data: Prisma.CampaignUpdateInput) {
        return this.prisma.campaign.update({
            where: { id },
            data,
        });
    }

    // Leads
    async createLead(data: Prisma.LeadCreateInput) {
        return this.prisma.lead.create({
            data,
        });
    }

    async findAllLeads() {
        return this.prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateLeadStatus(id: string, status: string) {
        return this.prisma.lead.update({
            where: { id },
            data: { status },
        });
    }
}
