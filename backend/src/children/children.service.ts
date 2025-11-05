import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async create(createChildDto: CreateChildDto) {
    return this.prisma.child.create({
      data: createChildDto,
      include: {
        documents: true,
      },
    });
  }

  async findAll() {
    return this.prisma.child.findMany({
      include: {
        documents: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const child = await this.prisma.child.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return child;
  }

  async update(id: string, updateChildDto: UpdateChildDto) {
    await this.findOne(id);
    return this.prisma.child.update({
      where: { id },
      data: updateChildDto,
      include: {
        documents: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.child.delete({
      where: { id },
    });
  }
}

