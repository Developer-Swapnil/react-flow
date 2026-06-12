import { useCallback, useEffect, useMemo } from "react";
import type { Edge, NodeChange, EdgeChange } from "@xyflow/react";
import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { useQueryClient } from "@tanstack/react-query";
import { useApps } from "@/hooks/useApps";
import { useGraph } from "@/hooks/useGraph";
import { useAppStore } from "@/store/useAppStore";
import type { NodeData, ServiceNode } from "@/types";
import { TopBar } from "@/components/layout/TopBar";
import { LeftRail } from "@/components/layout/LeftRail";
import { RightPanel } from "@/components/layout/RightPanel";
import { AppCanvas } from "@/components/canvas/AppCanvas";

const App = () => {
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const selectedNodeId = useAppStore((state) => state.selectedNodeId);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId);
  const queryClient = useQueryClient();
  const appsQuery = useApps();
  const graphQuery = useGraph(selectedAppId);
  const graph = graphQuery.data;

  const nodes = useMemo(() => graph?.nodes ?? [], [graph?.nodes]);
  const edges = useMemo(() => graph?.edges ?? [], [graph?.edges]);

  useEffect(() => {
    if (!selectedAppId && appsQuery.data?.[0]) {
      setSelectedAppId(appsQuery.data[0].id);
    }
  }, [appsQuery.data, selectedAppId, setSelectedAppId]);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  const setNodes = useCallback(
    (updater: ServiceNode[] | ((nodes: ServiceNode[]) => ServiceNode[])) => {
      if (!selectedAppId) {
        return;
      }
      const current = graphQuery.data;
      if (!current) {
        return;
      }
      const nextNodes = typeof updater === "function" ? updater(current.nodes) : updater;
      queryClient.setQueryData(["graph", selectedAppId], { ...current, nodes: nextNodes });
    },
    [graphQuery.data, queryClient, selectedAppId],
  );

  const setEdges = useCallback(
    (updater: Edge[] | ((edges: Edge[]) => Edge[])) => {
      if (!selectedAppId || !graphQuery.data) {
        return;
      }
      const nextEdges = typeof updater === "function" ? updater(graphQuery.data.edges) : updater;
      queryClient.setQueryData(["graph", selectedAppId], { ...graphQuery.data, edges: nextEdges });
    },
    [graphQuery.data, queryClient, selectedAppId],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((currentNodes) => applyNodeChanges(changes, currentNodes) as ServiceNode[]);
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
    },
    [setEdges],
  );

  const updateNodeData = useCallback(
    (nodeId: string, patch: Partial<NodeData>) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
        ),
      );
    },
    [setNodes],
  );

  const deleteSelectedNode = useCallback(() => {
    if (!selectedNodeId) {
      return;
    }
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== selectedNodeId));
    setEdges((currentEdges) =>
      currentEdges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId),
    );
    setSelectedNodeId(null);
  }, [selectedNodeId, setEdges, setNodes, setSelectedNodeId]);

  return (
    <div className="app-shell">
      <TopBar />
      <LeftRail />
      <main className="canvas-region">
        <AppCanvas
          nodes={nodes}
          edges={edges}
          isLoading={graphQuery.isLoading || appsQuery.isLoading}
          isError={graphQuery.isError || appsQuery.isError}
          onRetry={() => {
            void appsQuery.refetch();
            void graphQuery.refetch();
          }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onDeleteSelected={deleteSelectedNode}
        />
      </main>
      <RightPanel
        apps={appsQuery.data ?? []}
        selectedNode={selectedNode}
        updateNodeData={updateNodeData}
        isLoadingApps={appsQuery.isLoading}
      />
    </div>
  );
};

export default App;
