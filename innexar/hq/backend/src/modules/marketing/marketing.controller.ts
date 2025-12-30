import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('marketing')
@UseGuards(JwtAuthGuard)
export class MarketingController {
    constructor(private readonly marketingService: MarketingService) { }

    // Campaigns
    @Get('campaigns')
    findAllCampaigns() {
        return this.marketingService.findAllCampaigns();
    }

    @Get('campaigns/:id')
    findOneCampaign(@Param('id') id: string) {
        return this.marketingService.findOneCampaign(id);
    }

    @Post('campaigns')
    createCampaign(@Body() data: Prisma.CampaignCreateInput, @Request() req) {
        // Injeta o ID do usuário criador se necessário. Aqui assumimos que o DTO já vem estruturado ou ajustamos
        return this.marketingService.createCampaign({
            ...data,
            createdBy: { connect: { id: req.user.sub } },
        });
    }

    @Patch('campaigns/:id')
    updateCampaign(@Param('id') id: string, @Body() data: Prisma.CampaignUpdateInput) {
        return this.marketingService.updateCampaign(id, data);
    }

    // Leads
    @Get('leads')
    findAllLeads() {
        return this.marketingService.findAllLeads();
    }

    @Post('leads')
    createLead(@Body() data: Prisma.LeadCreateInput) {
        return this.marketingService.createLead(data);
    }

    @Patch('leads/:id/status')
    updateLeadStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.marketingService.updateLeadStatus(id, status);
    }
}
