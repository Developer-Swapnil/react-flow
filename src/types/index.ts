import type { Edge, Node } from "@xyflow/react";

export type AppSummary = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type NodeStatus = "Healthy" | "Degraded" | "Down";

export type ServiceMetric = "CPU" | "Memory" | "Disk" | "Region";

export type NodeData = {
  id: string;
  label: string;
  serviceType: string;
  icon: string;
  status: NodeStatus;
  cost: string;
  sliderValue: number;
  region: string;
  description?: string;
} & Record<string, unknown>;

export type ServiceNode = Node<NodeData, "service">;

export type EdgeData = Edge;

export type GraphData = {
  nodes: ServiceNode[];
  edges: EdgeData[];
};
