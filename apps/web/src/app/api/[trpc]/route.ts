import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { apiRouter } from "@/trpc/router";

async function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api",
    req: req,
    router: apiRouter,
  });
}
export { handler as GET, handler as POST };
