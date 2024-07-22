"use client";
import m, { forwardRef as f } from "react";
import a from "./gatsby-source-storyblok6.mjs";
import { useStoryblokState as l } from "./gatsby-source-storyblok7.mjs";
const S = f(
  ({ story: o, bridgeOptions: t, ...r }, e) => (o = l(o, t), /* @__PURE__ */ m.createElement(a, { ref: e, blok: o.content, ...r }))
);
export {
  S as default
};
