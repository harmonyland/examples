/** @jsx h */

import { h, html, Page, ssr, tw } from "./common.ts";
import { examples, parseExample } from "../examples/mod.ts";

let cached: string | null;

function Index() {
  return ssr(() => [
    <title>Harmony by Example</title>,
    <div class={tw`bg-white flex h-screen`}>
      <h1 class={tw`text-5xl text-gray-600 m-auto mt-20`}>
        Harmony by Example
      </h1>
    </div>,
  ]);
}

export default {
  path: new URLPattern({ pathname: "/" }),
  handle(_req, _pattern) {
    cached = cached ?? Index();
    return html(cached);
  },
} as Page;
