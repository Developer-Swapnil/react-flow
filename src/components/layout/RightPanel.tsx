import type { AppSummary, NodeData, ServiceNode } from "@/types";
import { AppList } from "@/components/apps/AppList";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

type RightPanelProps = {
  apps: AppSummary[];
  selectedNode: ServiceNode | null;
  updateNodeData: (nodeId: string, patch: Partial<NodeData>) => void;
  isLoadingApps: boolean;
};

export const RightPanel = ({ apps, selectedNode, updateNodeData, isLoadingApps }: RightPanelProps) => {
  const isMobilePanelOpen = useAppStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);

  return (
    <>
      <div
        className={isMobilePanelOpen ? "panel-backdrop visible" : "panel-backdrop"}
        onClick={() => setMobilePanelOpen(false)}
      />
      <aside className={isMobilePanelOpen ? "right-panel open" : "right-panel"}>
        <div className="panel-mobile-heading">
          <span>Workspace</span>
          <Button aria-label="Close panel" onClick={() => setMobilePanelOpen(false)} size="icon" variant="ghost">
            <X size={18} />
          </Button>
        </div>
        <AppList apps={apps} isLoading={isLoadingApps} />
        <NodeInspector selectedNode={selectedNode} updateNodeData={updateNodeData} />
      </aside>
    </>
  );
};
