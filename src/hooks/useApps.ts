import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "@/api/appsApi";

export const useApps = () =>
  useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
