import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll() {
    return this.prisma.saaSProduct.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async getById(id: string) {
    return this.prisma.saaSProduct.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProductDto) {
    const { slug, url, color, ...rest } = data;
    return this.prisma.saaSProduct.create({
      data: {
        ...rest,
        code: slug,
        baseUrl: url,
        // color is currently not persisted in DB
      },
    });
  }

  async update(id: string, data: UpdateProductDto) {
    const { slug, url, color, ...rest } = data;
    const updateData: any = { ...rest };
    if (slug) updateData.code = slug;
    if (url) updateData.baseUrl = url;

    return this.prisma.saaSProduct.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    // Soft delete usually, or real delete if no dependencies
    return this.prisma.saaSProduct.delete({
      where: { id },
    });
  }
}

