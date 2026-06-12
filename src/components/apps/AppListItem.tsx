import { Check } from "lucide-react";
import type { AppSummary } from "@/types";
import { useAppStore } from "@/store/useAppStore";

type AppListItemProps = {
  app: AppSummary;
};

export const AppListItem = ({ app }: AppListItemProps) => {
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);
  const isSelected = selectedAppId === app.id;

  return (
    <button
      className={isSelected ? "app-list-item selected" : "app-list-item"}
      onClick={() => setSelectedAppId(app.id)}
      type="button"
    >
      <span className="app-icon" style={{ backgroundColor: app.color }}>
        {app.icon}
      </span>
      <span className="app-name">{app.name}</span>
      {isSelected ? <Check size={16} /> : null}
    </button>
  );
};
