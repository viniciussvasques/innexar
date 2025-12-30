import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AffiliatesService } from './affiliates.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AffiliatesController {
    constructor(private readonly affiliatesService: AffiliatesService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createAffiliateDto: CreateAffiliateDto) {
        return this.affiliatesService.create(createAffiliateDto);
    }

    @Get()
    findAll() {
        return this.affiliatesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.affiliatesService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateAffiliateDto: UpdateAffiliateDto) {
        return this.affiliatesService.update(id, updateAffiliateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.affiliatesService.remove(id);
    }
}
