import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PrismaService } from "../../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

class AffiliateLoginDto {
  email: string;
  password: string;
}

class AffiliateRegisterDto {
  name: string;
  email: string;
  password: string;
  cpfCnpj?: string;
  pixKey?: string;
}

@ApiTags("Affiliate Auth")
@Controller("affiliate-portal")
export class AffiliateAuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("login")
  @ApiOperation({ summary: "Login de afiliado" })
  async login(@Body() dto: AffiliateLoginDto) {
    // Buscar afiliado pelo email
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { email: dto.email },
      include: {
        links: {
          include: { product: true },
        },
      },
    });

    if (!affiliate) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    // Verificar se o afiliado tem senha configurada
    if (!affiliate.password) {
      throw new UnauthorizedException(
        "Senha não configurada. Entre em contato com o suporte.",
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      affiliate.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Email ou senha inválidos");
    }

    // Verificar status do afiliado
    if (affiliate.status !== "active") {
      if (affiliate.status === "pending") {
        throw new UnauthorizedException(
          "Sua conta está aguardando aprovação do administrador",
        );
      }
      throw new UnauthorizedException("Sua conta de afiliado está bloqueada");
    }

    // Gerar token JWT
    const payload = {
      sub: affiliate.id,
      email: affiliate.email,
      affiliateId: affiliate.id,
      type: "affiliate",
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      affiliate: {
        id: affiliate.id,
        name: affiliate.name,
        email: affiliate.email,
        status: affiliate.status,
        pixKey: affiliate.pixKey,
        linksCount: affiliate.links.length,
      },
    };
  }

  @Post("register")
  @ApiOperation({ summary: "Registro de novo afiliado" })
  async register(@Body() dto: AffiliateRegisterDto) {
    // Verificar se email já existe
    const existingAffiliate = await this.prisma.affiliate.findUnique({
      where: { email: dto.email },
    });

    if (existingAffiliate) {
      throw new ConflictException(
        "Este email já está cadastrado como afiliado",
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Criar afiliado
    const affiliate = await this.prisma.affiliate.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        cpfCnpj: dto.cpfCnpj,
        pixKey: dto.pixKey,
        status: "pending", // Pendente de aprovação
      },
    });

    return {
      message:
        "Conta criada com sucesso! Aguarde a aprovação do administrador.",
      affiliate: {
        id: affiliate.id,
        name: affiliate.name,
        email: affiliate.email,
        status: affiliate.status,
      },
    };
  }
}
