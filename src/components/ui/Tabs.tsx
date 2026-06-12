import type { ReactNode } from "react";
import { clsx } from "clsx";

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  tabs: { value: string; label: string; content: ReactNode }[];
};

export const Tabs = ({ value, onValueChange, tabs }: TabsProps) => (
  <div className="tabs">
    <div className="tabs-list" role="tablist">
      {tabs.map((tab) => (
        <button
          className={clsx("tabs-trigger", value === tab.value && "is-active")}
          key={tab.value}
          onClick={() => onValueChange(tab.value)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
    {tabs.map((tab) => (
      <div hidden={tab.value !== value} key={tab.value} role="tabpanel">
        {tab.content}
      </div>
    ))}
  </div>
);
