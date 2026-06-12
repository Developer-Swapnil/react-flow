import { Bell, Menu, Maximize2, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export const TopBar = () => {
  const isMobilePanelOpen = useAppStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);

  return (
    <header className="top-bar">
      <div className="brand">
        <Button
          aria-label="Open panel"
          className="mobile-panel-button"
          onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
          size="icon"
          variant="ghost"
        >
          <Menu size={18} />
        </Button>
        <div className="brand-mark">AG</div>
        <div>
          <div className="brand-title">App Graph Builder</div>
          <div className="brand-subtitle">ReactFlow Canvas</div>
        </div>
      </div>
      <div className="top-actions">
        <Button
          onClick={() => window.dispatchEvent(new CustomEvent("app-graph:fit-view"))}
          size="sm"
          variant="outline"
        >
          <Maximize2 size={16} />
          Fit view
        </Button>
        <Button aria-label="Search" size="icon" variant="ghost">
          <Search size={18} />
        </Button>
        <Button aria-label="Notifications" size="icon" variant="ghost">
          <Bell size={18} />
        </Button>
        <Button aria-label="Theme" size="icon" variant="ghost">
          <Moon size={18} />
        </Button>
      </div>
    </header>
  );
};
