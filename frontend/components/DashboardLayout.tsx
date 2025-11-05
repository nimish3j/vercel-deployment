"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function DashboardLayout({
  children,
  headerTitle = "Welcome back, Super Administrator!",
  headerSubtitle,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Fixed Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex-shrink-0">
          <h1 className="text-2xl font-semibold text-gray-900">{headerTitle}</h1>
          {headerSubtitle && (
            <p className="text-sm text-gray-600 mt-1">{headerSubtitle}</p>
          )}
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

