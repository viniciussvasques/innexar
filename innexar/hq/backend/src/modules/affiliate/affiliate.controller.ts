import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AffiliateService } from './affiliate.service';
import { CreateLinkDto, UpdateProfileDto, RequestWithdrawalDto } from './dto/affiliate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Affiliate')
@Controller('affiliate')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  // ============ DASHBOARD ============

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas do afiliado' })
  async getStats(@Request() req) {
    return this.affiliateService.getStats(req.user.sub);
  }

  // ============ LINKS ============

  @Get('links')
  @ApiOperation({ summary: 'Listar links do afiliado' })
  async getLinks(@Request() req) {
    return this.affiliateService.getLinks(req.user.sub);
  }

  @Post('links')
  @ApiOperation({ summary: 'Criar novo link de afiliado' })
  async createLink(@Request() req, @Body() dto: CreateLinkDto) {
    return this.affiliateService.createLink(req.user.sub, dto);
  }

  @Delete('links/:id')
  @ApiOperation({ summary: 'Remover link de afiliado' })
  async deleteLink(@Request() req, @Param('id') linkId: string) {
    return this.affiliateService.deleteLink(req.user.sub, linkId);
  }

  // ============ COMISSÕES ============

  @Get('commissions')
  @ApiOperation({ summary: 'Listar comissões do afiliado' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'approved', 'paid', 'cancelled'] })
  async getCommissions(@Request() req, @Query('status') status?: string) {
    return this.affiliateService.getCommissions(req.user.sub, status);
  }

  // ============ PERFIL ============

  @Get('profile')
  @ApiOperation({ summary: 'Dados do perfil do afiliado' })
  async getProfile(@Request() req) {
    return this.affiliateService.getProfile(req.user.sub);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Atualizar perfil do afiliado' })
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.affiliateService.updateProfile(req.user.sub, dto);
  }

  // ============ SAQUES ============

  @Get('withdrawals')
  @ApiOperation({ summary: 'Histórico de saques' })
  async getWithdrawals(@Request() req) {
    return this.affiliateService.getWithdrawals(req.user.sub);
  }

  @Post('withdrawals')
  @ApiOperation({ summary: 'Solicitar saque' })
  async requestWithdrawal(@Request() req, @Body() dto: RequestWithdrawalDto) {
    return this.affiliateService.requestWithdrawal(req.user.sub, dto.amount);
  }
}

