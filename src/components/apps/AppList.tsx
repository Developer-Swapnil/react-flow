import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { AppSummary } from "@/types";
import { AppListItem } from "@/components/apps/AppListItem";
import { Input } from "@/components/ui/Input";

type AppListProps = {
  apps: AppSummary[];
  isLoading: boolean;
};

export const AppList = ({ apps, isLoading }: AppListProps) => {
  const [query, setQuery] = useState("");
  const filteredApps = useMemo(
    () => apps.filter((app) => app.name.toLowerCase().includes(query.trim().toLowerCase())),
    [apps, query],
  );

  return (
    <section className="panel-section app-list-section">
      <div className="section-heading">
        <span>Applications</span>
        <span className="section-count">{apps.length}</span>
      </div>
      <label className="search-field">
        <Search size={16} />
        <Input
          aria-label="Search apps"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search apps"
          value={query}
        />
      </label>
      <div className="app-list">
        {isLoading ? (
          <>
            <div className="skeleton app-skeleton" />
            <div className="skeleton app-skeleton" />
            <div className="skeleton app-skeleton" />
          </>
        ) : (
          filteredApps.map((app) => <AppListItem app={app} key={app.id} />)
        )}
      </div>
    </section>
  );
};
