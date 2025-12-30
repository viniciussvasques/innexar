import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!affiliate) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, affiliate.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (affiliate.status === 'blocked') {
      throw new UnauthorizedException('Sua conta foi bloqueada. Entre em contato com o suporte.');
    }

    if (affiliate.status === 'pending') {
      throw new UnauthorizedException('Sua conta está aguardando aprovação. Você receberá um e-mail quando for aprovada.');
    }

    // Atualiza último login
    await this.prisma.affiliate.update({
      where: { id: affiliate.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = { 
      sub: affiliate.id, 
      email: affiliate.email,
      role: 'affiliate',
    };

    return {
      accessToken: this.jwtService.sign(payload),
      affiliate: {
        id: affiliate.id,
        name: affiliate.name,
        email: affiliate.email,
        status: affiliate.status,
        referralCode: affiliate.referralCode,
      },
    };
  }

  async register(dto: RegisterDto) {
    // Verifica se email já existe
    const existingAffiliate = await this.prisma.affiliate.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingAffiliate) {
      throw new ConflictException('Este e-mail já está cadastrado');
    }

    // Gera código de referência único
    const referralCode = await this.generateUniqueReferralCode(dto.name);

    // Hash da senha
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Cria o afiliado
    const affiliate = await this.prisma.affiliate.create({
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        password: hashedPassword,
        phone: dto.phone,
        cpfCnpj: dto.cpfCnpj,
        pixKey: dto.pixKey,
        pixKeyType: dto.pixKeyType,
        referralCode,
        status: 'pending', // Requer aprovação
        acceptedTermsAt: new Date(),
      },
    });

    // TODO: Enviar e-mail de boas-vindas
    // TODO: Notificar admins sobre novo cadastro

    return {
      message: 'Cadastro realizado com sucesso! Sua conta está aguardando aprovação. Você receberá um e-mail quando for aprovada.',
      affiliate: {
        id: affiliate.id,
        name: affiliate.name,
        email: affiliate.email,
        referralCode: affiliate.referralCode,
      },
    };
  }

  private async generateUniqueReferralCode(name: string): Promise<string> {
    // Gera código baseado no nome + random
    const baseName = name
      .split(' ')[0]
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z]/g, '')
      .substring(0, 6);
    
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    let code = `${baseName}${randomSuffix}`;

    // Verifica unicidade
    let exists = await this.prisma.affiliate.findUnique({ where: { referralCode: code } });
    let attempts = 0;

    while (exists && attempts < 10) {
      const newSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      code = `${baseName}${newSuffix}`;
      exists = await this.prisma.affiliate.findUnique({ where: { referralCode: code } });
      attempts++;
    }

    return code;
  }

  async validateToken(userId: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        referralCode: true,
        pixKey: true,
        phone: true,
      },
    });

    if (!affiliate || affiliate.status === 'blocked') {
      throw new UnauthorizedException('Token inválido');
    }

    return affiliate;
  }
}

