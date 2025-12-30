import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../database/prisma.service";

@Injectable()
export class AdminWebhooksService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.adminWebhook.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const webhook = await this.prisma.adminWebhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      throw new NotFoundException("Webhook não encontrado");
    }

    return webhook;
  }

  async create(data: unknown) {
    return this.prisma.adminWebhook.create({ data: data as any });
  }

  async update(id: string, data: unknown) {
    await this.findOne(id);
    return this.prisma.adminWebhook.update({ where: { id }, data: data as any });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.adminWebhook.delete({ where: { id } });
  }
}
