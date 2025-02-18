import { Calendar, FolderIcon, Star } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/utils/cn";

interface SidebarHeaderProps {
  tab: "default" | "journal";
  onTabChange: (newTab: "default" | "journal") => void;
}

export const SidebarHeader = ({ onTabChange, tab }: SidebarHeaderProps) => {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-stroke-base px-4">
      <h1 className="text-xl font-semibold leading-none text-shade-primary">
        {tab === "default" ? "Mixim Notes" : "Journal"}
      </h1>
      <div className="flex items-center gap-2">
        <IconButton
          variant="ghost"
          onClick={() => onTabChange("default")}
          className={cn({ "bg-back-hover": tab === "default" })}
        >
          <FolderIcon className="text-shade-seondary h-5 w-5" />
        </IconButton>
        <IconButton
          variant="ghost"
          onClick={() => onTabChange("journal")}
          className={cn({ "bg-back-hover": tab === "journal" })}
        >
          <Calendar className="text-shade-seondary h-5 w-5" />
        </IconButton>
        <IconButton variant="ghost">
          <Star className="text-shade-seondary h-5 w-5" />
        </IconButton>
      </div>
    </div>
  );
};
