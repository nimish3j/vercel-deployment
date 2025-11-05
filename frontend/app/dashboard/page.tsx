"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { ActivityList } from "@/components/ActivityList";
import { QuickActionsRow } from "@/components/QuickActionsRow";
import {
  FileText,
  Users,
  FolderOpen,
  TrendingUp,
} from "lucide-react";

interface DashboardStats {
  totalDocuments: number;
  totalChildren: number;
  totalUsers: number;
  totalEvents: number;
  documentsByStatus: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

interface ActivityItem {
  type: string;
  id: string;
  action: string;
  childName?: string;
  uploadedBy?: string;
  status?: string;
  eventDate?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [statsResponse, activityResponse] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/recent-activity"),
        ]);

        if (!statsResponse.ok || !activityResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const statsData = await statsResponse.json();
        const activityData = await activityResponse.json();

        setStats(statsData);
        setActivity(activityData);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Quick Actions */}
        <QuickActionsRow />

        {/* Metric Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Documents"
              value={stats.totalDocuments.toLocaleString()}
              icon={FileText}
              change={`${stats.documentsByStatus.pending} pending`}
              trend="up"
            />
            <MetricCard
              title="Total Children"
              value={stats.totalChildren.toLocaleString()}
              icon={Users}
              change={`${stats.totalUsers} users`}
              trend="up"
            />
            <MetricCard
              title="Total Events"
              value={stats.totalEvents.toLocaleString()}
              icon={FolderOpen}
              change={`${stats.documentsByStatus.approved} approved docs`}
              trend="up"
            />
            <MetricCard
              title="Approved Documents"
              value={stats.documentsByStatus.approved.toLocaleString()}
              icon={TrendingUp}
              change={`${stats.documentsByStatus.rejected} rejected`}
              trend="up"
            />
          </div>
        )}

        {/* Activity List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityList activities={activity} />
          </div>
          <div>
            {/* Placeholder for additional content */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

