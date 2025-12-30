import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AffiliateStatus {
    active = 'active',
    pending = 'pending',
    inactive = 'inactive',
}

export class CreateAffiliateDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123.456.789-00' })
    @IsString()
    @IsNotEmpty()
    document: string;

    @ApiProperty({ example: '(11) 98765-4321' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ enum: AffiliateStatus, default: AffiliateStatus.pending })
    @IsEnum(AffiliateStatus)
    @IsOptional()
    status?: AffiliateStatus;
}
