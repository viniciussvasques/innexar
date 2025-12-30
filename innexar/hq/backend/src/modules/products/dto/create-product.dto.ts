import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsHexColor, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Mecânica365' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'mecanica365' })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiProperty({ example: 'ERP para oficinas' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'https://mecanica365.com' })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ example: '#3B82F6' })
    @IsHexColor()
    @IsNotEmpty()
    color: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
