import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login do afiliado' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login/team')
  @ApiOperation({ summary: 'Login da equipe interna (HQ)' })
  async loginTeam(@Body() dto: LoginDto) {
    return this.authService.loginTeam(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Cadastro de novo afiliado' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dados do afiliado logado' })
  async getMe(@Request() req) {
    return this.authService.validateToken(req.user.sub);
  }
}

