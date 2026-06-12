import { Boxes, Database, GitBranch, KeyRound, Network, Server, Settings } from "lucide-react";

const items = [
  { label: "Graph", icon: Network },
  { label: "Repos", icon: GitBranch },
  { label: "Databases", icon: Database },
  { label: "Services", icon: Server },
  { label: "Auth", icon: KeyRound },
  { label: "Stacks", icon: Boxes },
];

export const LeftRail = () => (
  <aside className="left-rail">
    <nav className="rail-nav" aria-label="Primary">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            aria-label={item.label}
            className={index === 0 ? "rail-button active" : "rail-button"}
            key={item.label}
            title={item.label}
            type="button"
          >
            <Icon size={19} />
          </button>
        );
      })}
    </nav>
    <button aria-label="Settings" className="rail-button" title="Settings" type="button">
      <Settings size={19} />
    </button>
  </aside>
);
