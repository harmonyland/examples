export interface Page {
  path: string;
  handle: (req: Request) => Response | Promise<Response | null> | null;
}

export * from "../ssr.tsx";
