import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BillingService {
    constructor(private prisma: PrismaService) { }

    // Plans
    async findAllPlans() {
        return this.prisma.plan.findMany({
            where: { isActive: true },
        });
    }

    async createPlan(data: Prisma.PlanCreateInput) {
        return this.prisma.plan.create({ data });
    }

    // Subscriptions
    async findAllSubscriptions() {
        return this.prisma.subscription.findMany({
            include: {
                plan: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createSubscription(data: Prisma.SubscriptionCreateInput) {
        return this.prisma.subscription.create({ data });
    }

    // Invoices
    async findAllInvoices() {
        return this.prisma.invoice.findMany({
            include: {
                subscription: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
