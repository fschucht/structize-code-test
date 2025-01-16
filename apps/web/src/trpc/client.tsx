"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  loggerLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { makeQueryClient } from "./queryClient";
import type { ApiRouter } from "./router";
import { z } from "zod";
import { isServer } from "@repo/ui/lib/utils";

const configSchema = z.object({
  TRPC_ENDPOINT_URL: z.coerce
    .string()
    .url()
    .endsWith("/api")
    .default("http://localhost:3000/api"),
});
const config = configSchema.parse(process.env);

export const trpc = createTRPCReact<ApiRouter>();

let queryClient: QueryClient;

function getQueryClient() {
  if (isServer()) {
    return makeQueryClient();
  }

  return (queryClient ??= makeQueryClient());
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        splitLink({
          condition: (operation) => operation.type === "subscription",
          true: unstable_httpSubscriptionLink({
            url: config.TRPC_ENDPOINT_URL,
          }),
          false: httpBatchLink({
            url: config.TRPC_ENDPOINT_URL,
          }),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
