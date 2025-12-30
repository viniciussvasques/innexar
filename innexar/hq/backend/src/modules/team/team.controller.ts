import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { Prisma, Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Roles } from '../auth/roles.decorator';
// import { RolesGuard } from '../auth/roles.guard';

@Controller('team')
@UseGuards(JwtAuthGuard)
export class TeamController {
    constructor(private readonly teamService: TeamService) { }

    @Post()
    // @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    create(@Body() data: Prisma.UserCreateInput) {
        return this.teamService.create(data);
    }

    @Get()
    findAll() {
        return this.teamService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teamService.findOne(id);
    }

    @Patch(':id')
    // @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
        return this.teamService.update(id, data);
    }

    @Delete(':id')
    // @Roles(Role.SUPER_ADMIN)
    remove(@Param('id') id: string) {
        return this.teamService.remove(id);
    }
}
