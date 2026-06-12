import { useCallback, useEffect, useMemo, type KeyboardEvent } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import type { ServiceNode } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import { ServiceNodeCard } from "@/components/canvas/ServiceNode";

type AppCanvasProps = {
  nodes: ServiceNode[];
  edges: Edge[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onDeleteSelected: () => void;
};

const CanvasInner = ({
  nodes,
  edges,
  isLoading,
  isError,
  onRetry,
  onNodesChange,
  onEdgesChange,
  onDeleteSelected,
}: AppCanvasProps) => {
  const reactFlow = useReactFlow();
  const selectedNodeId = useAppStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId);
  const nodeTypes = useMemo(() => ({ service: ServiceNodeCard }), []);

  useEffect(() => {
    const fit = () => reactFlow.fitView({ duration: 350, padding: 0.2 });
    window.addEventListener("app-graph:fit-view", fit);
    return () => window.removeEventListener("app-graph:fit-view", fit);
  }, [reactFlow]);

  useEffect(() => {
    if (nodes.length > 0) {
      window.setTimeout(() => reactFlow.fitView({ padding: 0.2 }), 50);
    }
  }, [nodes, reactFlow]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if ((event.key === "Delete" || event.key === "Backspace") && selectedNodeId) {
        event.preventDefault();
        onDeleteSelected();
      }
      if (event.key.toLowerCase() === "f") {
        reactFlow.fitView({ duration: 250, padding: 0.2 });
      }
      if (event.key === "Escape") {
        setSelectedNodeId(null);
      }
    },
    [onDeleteSelected, reactFlow, selectedNodeId, setSelectedNodeId],
  );

  if (isLoading) {
    return (
      <div className="canvas-state">
        <div className="spinner" />
        <span>Loading graph</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="canvas-state">
        <strong>Graph failed to load.</strong>
        <Button onClick={onRetry} size="sm">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="reactflow-frame" onKeyDown={handleKeyDown} tabIndex={0}>
      <ReactFlow
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onNodesChange={onNodesChange}
      >
        <Background color="#aeb8c8" gap={22} size={1.5} variant={BackgroundVariant.Dots} />
        <MiniMap pannable zoomable nodeStrokeWidth={3} />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
};

export const AppCanvas = (props: AppCanvasProps) => (
  <ReactFlowProvider>
    <CanvasInner {...props} />
  </ReactFlowProvider>
);
