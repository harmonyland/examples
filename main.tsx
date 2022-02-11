import { serve } from "./deps.ts";
import { Page } from "./pages/common.ts";
import { pages } from "./pages/mod.ts";

serve(async (req) => {
  let match: [Page, URLPatternResult] | null = null;
  for (const page of pages) {
    const res = page.path.exec(req.url);
    if (res) {
      match = [page, res];
      break;
    }
  }

  // TODO: maybe proper 404 page?
  if (!match) return new Response("Not Found", { status: 404 });

  const [page, pattern] = match;
  const response = await page.handle(req, pattern);

  if (!response) return new Response("Not Found", { status: 404 });
  else return response;
}, { port: 3000 });

console.log("Listening on http://localhost:3000");
