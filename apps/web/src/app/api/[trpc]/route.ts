import { apiRouter } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api",
    req: req,
    router: apiRouter,
  });
}
export { handler as GET, handler as POST };
