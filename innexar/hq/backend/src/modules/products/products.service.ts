import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

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
}

