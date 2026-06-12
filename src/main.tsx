import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "@/App";
import "@/styles.css";
import "@xyflow/react/dist/style.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const enableMocking = async () => {
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass", quiet: true });
};

enableMocking().finally(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
