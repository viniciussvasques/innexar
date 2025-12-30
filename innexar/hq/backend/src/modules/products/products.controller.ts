import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos SaaS disponíveis' })
  async getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de um produto' })
  async getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }
}

