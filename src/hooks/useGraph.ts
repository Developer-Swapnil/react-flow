import { useQuery } from "@tanstack/react-query";
import { fetchGraph } from "@/api/graphApi";

export const useGraph = (appId: string | null) =>
  useQuery({
    queryKey: ["graph", appId],
    queryFn: () => fetchGraph(appId ?? ""),
    enabled: Boolean(appId),
  });
