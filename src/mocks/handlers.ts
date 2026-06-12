import { http, HttpResponse, delay } from "msw";
import { apps, createGraph } from "@/data/mockData";

export const handlers = [
  http.get("/apps", async () => {
    await delay(300);
    return HttpResponse.json(apps);
  }),
  http.get("/apps/:appId/graph", async ({ params }) => {
    await delay(500);
    const appId = String(params.appId);

    if (appId.includes("ruby") && Math.random() < 0.15) {
      return HttpResponse.json({ message: "Simulated graph fetch failure" }, { status: 500 });
    }

    return HttpResponse.json(createGraph(appId));
  }),
];
