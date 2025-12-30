import { IsString, IsOptional, IsNumber, Min, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ description: 'ID do produto SaaS' })
  @IsUUID()
  productId: string;

  @ApiPropertyOptional({ description: 'Slug personalizado para o link' })
  @IsOptional()
  @IsString()
  customSlug?: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pixKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pixKeyType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankAgency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankAccount?: string;
}

export class RequestWithdrawalDto {
  @ApiProperty({ description: 'Valor do saque', minimum: 50 })
  @IsNumber()
  @Min(50, { message: 'Valor mínimo para saque é R$ 50,00' })
  amount: number;
}

