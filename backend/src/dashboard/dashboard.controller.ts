import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getAggregatedCounts() {
    return this.dashboardService.getAggregatedCounts();
  }

  @Get('recent-activity')
  getRecentActivity(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.dashboardService.getRecentActivity(limitNum);
  }

  @Get()
  getAll() {
    return Promise.all([
      this.dashboardService.getAggregatedCounts(),
      this.dashboardService.getRecentActivity(),
    ]).then(([counts, activity]) => ({
      counts,
      activity,
    }));
  }
}

