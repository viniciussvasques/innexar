import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupportService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.ticket.findMany({
            include: {
                assignedTo: {
                    select: { id: true, name: true, avatarUrl: true },
                },
                _count: {
                    select: { messages: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                assignedTo: {
                    select: { id: true, name: true, avatarUrl: true },
                },
                messages: {
                    include: {
                        user: {
                            select: { id: true, name: true, avatarUrl: true },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!ticket) {
            throw new NotFoundException('Ticket não encontrado');
        }

        return ticket;
    }

    async create(data: Prisma.TicketCreateInput) {
        return this.prisma.ticket.create({
            data,
        });
    }

    async update(id: string, data: Prisma.TicketUpdateInput) {
        return this.prisma.ticket.update({
            where: { id },
            data,
        });
    }

    async addMessage(ticketId: string, content: string, userId: string, isInternal: boolean = false) {
        return this.prisma.ticketMessage.create({
            data: {
                ticket: { connect: { id: ticketId } },
                content,
                isInternal,
                user: { connect: { id: userId } },
            },
        });
    }
}
