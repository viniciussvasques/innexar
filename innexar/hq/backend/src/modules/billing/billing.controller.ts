import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get('plans')
    findAllPlans() {
        return this.billingService.findAllPlans();
    }

    @Post('plans')
    createPlan(@Body() data: Prisma.PlanCreateInput) {
        return this.billingService.createPlan(data);
    }

    @Get('subscriptions')
    findAllSubscriptions() {
        return this.billingService.findAllSubscriptions();
    }

    @Post('subscriptions')
    createSubscription(@Body() data: Prisma.SubscriptionCreateInput) {
        return this.billingService.createSubscription(data);
    }

    @Get('invoices')
    findAllInvoices() {
        return this.billingService.findAllInvoices();
    }
}
