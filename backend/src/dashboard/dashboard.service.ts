import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getAggregatedCounts() {
    const [
      totalDocuments,
      totalChildren,
      totalUsers,
      totalEvents,
      pendingDocuments,
      approvedDocuments,
      rejectedDocuments,
    ] = await Promise.all([
      this.prisma.document.count(),
      this.prisma.child.count(),
      this.prisma.user.count(),
      this.prisma.event.count(),
      this.prisma.document.count({ where: { status: 'PENDING' } }),
      this.prisma.document.count({ where: { status: 'APPROVED' } }),
      this.prisma.document.count({ where: { status: 'REJECTED' } }),
    ]);

    return {
      totalDocuments,
      totalChildren,
      totalUsers,
      totalEvents,
      documentsByStatus: {
        pending: pendingDocuments,
        approved: approvedDocuments,
        rejected: rejectedDocuments,
      },
    };
  }

  async getRecentActivity(limit: number = 10) {
    const [recentDocuments, recentChildren, recentEvents] = await Promise.all([
      this.prisma.document.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          child: {
            select: {
              id: true,
              name: true,
            },
          },
          uploader: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.child.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Combine and sort by date
    const activities: any[] = [
      ...recentDocuments.map((doc) => ({
        type: 'document' as const,
        id: doc.id,
        action: `Document uploaded: ${doc.url}`,
        childName: doc.child.name,
        uploadedBy: doc.uploader.username,
        status: doc.status,
        createdAt: doc.createdAt,
      })),
      ...recentChildren.map((child) => ({
        type: 'child' as const,
        id: child.id,
        action: `Child added: ${child.name}`,
        childName: child.name,
        status: child.status,
        createdAt: child.createdAt,
      })),
      ...recentEvents.map((event) => ({
        type: 'event' as const,
        id: event.id,
        action: `Event created: ${event.title}`,
        eventDate: event.date,
        createdAt: event.createdAt,
      })),
    ];

    return activities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }).slice(0, limit);
  }
}

