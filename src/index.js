import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmployeeProvider } from "./context/EmployeeContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </QueryClientProvider>
  </StrictMode>
);
