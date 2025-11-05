import { Button } from "@/components/ui/button";
import { Upload, FilePlus, FolderPlus, UserPlus } from "lucide-react";

export function QuickActionsRow() {
  const actions = [
    { icon: Upload, label: "Upload Document", variant: "default" as const },
    { icon: FilePlus, label: "New Document", variant: "outline" as const },
    { icon: FolderPlus, label: "New Folder", variant: "outline" as const },
    { icon: UserPlus, label: "Add User", variant: "outline" as const },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button key={action.label} variant={action.variant} className="gap-2">
            <Icon className="h-4 w-4" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

