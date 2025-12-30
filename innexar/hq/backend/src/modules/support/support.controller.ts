import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { SupportService } from './support.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @Get()
    findAll() {
        return this.supportService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.supportService.findOne(id);
    }

    @Post()
    create(@Body() data: Prisma.TicketCreateInput) {
        return this.supportService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Prisma.TicketUpdateInput) {
        return this.supportService.update(id, data);
    }

    @Post(':id/messages')
    addMessage(
        @Param('id') id: string,
        @Body() body: { content: string; isInternal?: boolean },
        @Request() req,
    ) {
        return this.supportService.addMessage(id, body.content, req.user.sub, body.isInternal);
    }
}
