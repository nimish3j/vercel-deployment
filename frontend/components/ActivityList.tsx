import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Clock, Calendar } from "lucide-react";

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

interface ActivityListProps {
  activities?: ActivityItem[];
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

export function ActivityList({ activities = [] }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 text-sm">
            No recent activity
          </div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-gray-500" />;
      case "child":
        return <User className="h-4 w-4 text-gray-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="mt-0.5">{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {activity.uploadedBy && (
                    <>
                      <p className="text-xs text-gray-500">
                        {activity.uploadedBy}
                      </p>
                      <span className="text-gray-300">•</span>
                    </>
                  )}
                  {activity.childName && (
                    <>
                      <p className="text-xs text-gray-500">
                        {activity.childName}
                      </p>
                      <span className="text-gray-300">•</span>
                    </>
                  )}
                  {activity.status && (
                    <>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          activity.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : activity.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {activity.status}
                      </span>
                      <span className="text-gray-300">•</span>
                    </>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

