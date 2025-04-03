import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import { NotificationContextProvider } from "./context/notification-context";

const queryClient = new QueryClient();

export const AppShell = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  );
};
