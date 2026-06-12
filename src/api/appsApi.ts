import { apps } from "@/data/mockData";
import type { AppSummary } from "@/types";

export const fetchApps = async (): Promise<AppSummary[]> => {
  try {
    const response = await fetch("/apps");
    if (!response.ok) {
      throw new Error("Failed to fetch apps");
    }
    return (await response.json()) as AppSummary[];
  } catch {
    return apps;
  }
};
