import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/query-client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
