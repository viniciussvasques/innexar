import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

@Injectable()
export class AffiliatesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.affiliate.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.affiliate.findUnique({
            where: { id },
        });
    }

    async create(data: CreateAffiliateDto) {
        // Basic creation, usually affiliates register themselves via Auth
        // But admin might want to create one manually
        // This requires password handling which is in AuthModule usually.
        // For now, we'll handle basic data or assume this is for "invite"
        // Let's just allow creating with a dummy password or require it.
        const hashedPassword = await import('bcryptjs').then(m => m.hash('123456', 10));

        return this.prisma.affiliate.create({
            data: {
                ...data,
                password: hashedPassword,
                status: data.status || 'pending',
            },
        });
    }

    async update(id: string, data: UpdateAffiliateDto) {
        return this.prisma.affiliate.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.affiliate.delete({
            where: { id },
        });
    }
}
