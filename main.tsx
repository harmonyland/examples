/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "./deps.ts";
import { Page } from "./pages/common.ts";
import { pages } from "./pages/mod.ts";

serve(async (req) => {
  let match: Page | null = null;
  const url = new URL(req.url);
  for (const page of pages) {
    const res = page.path === url.pathname;
    if (res) {
      match = page;
      break;
    }
  }

  // TODO: maybe proper 404 page?
  if (!match) return new Response("Not Found", { status: 404 });

  const response = await match.handle(req);

  if (!response) return new Response("Not Found", { status: 404 });
  else return response;
}, { port: 3000 });

console.log("Listening on http://localhost:3000");
