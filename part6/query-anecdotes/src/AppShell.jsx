import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

export const AppShell = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
