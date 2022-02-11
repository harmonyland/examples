// deno-lint-ignore-file no-explicit-any

/** @jsx h */

import {
  getStyleTag,
  h,
  renderToString,
  setup,
  typography,
  virtualSheet,
} from "./deps.ts";

let SHEET_SINGLETON: any = null;
function sheet(twOptions = {}) {
  return SHEET_SINGLETON ?? (SHEET_SINGLETON = setupSheet(twOptions));
}

// Setup TW sheet singleton
function setupSheet(twOptions: Record<string, any>) {
  const sheet = virtualSheet();
  setup({ ...twOptions, sheet, plugins: { ...typography() } });
  return sheet;
}

function makeHtml({ body, head, styleTag }: any) {
  const html = (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {head}
      </head>
      <body>
        {body}
      </body>
    </html>
  );
  return renderToString(html).replace("<head>", `<head>${styleTag}`);
}

export function ssr(
  func: CallableFunction,
  options?: any,
) {
  sheet(options?.tw ?? {}).reset();
  const [head, body] = func();
  const styleTag = getStyleTag(sheet());
  return makeHtml({ body, head, styleTag });
}

export function html(response: string, status?: number) {
  return new Response("<!DOCTYPE HTML>" + response, {
    status,
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
  });
}

export { Fragment, h, tw } from "./deps.ts";
