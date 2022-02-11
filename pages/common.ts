export interface Page {
  path: URLPattern;
  handle: (
    req: Request,
    pattern: URLPatternResult,
  ) => Response | Promise<Response | null> | null;
}

export * from "../ssr.tsx";
