import { createGraph } from "@/data/mockData";
import type { GraphData } from "@/types";

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  try {
    const response = await fetch(`/apps/${appId}/graph`);
    if (!response.ok) {
      throw new Error("Failed to fetch graph");
    }
    return (await response.json()) as GraphData;
  } catch {
    return createGraph(appId);
  }
};
