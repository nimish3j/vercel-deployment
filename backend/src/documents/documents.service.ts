import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentDto: CreateDocumentDto, uploadedBy: string) {
    return this.prisma.document.create({
      data: {
        ...createDocumentDto,
        uploadedBy,
      },
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.document.findMany({
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    await this.findOne(id);
    return this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.document.delete({
      where: { id },
    });
  }

  async findByChildId(childId: string) {
    return this.prisma.document.findMany({
      where: { childId },
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.document.findMany({
      where: { status: status as any },
      include: {
        child: true,
        uploader: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

