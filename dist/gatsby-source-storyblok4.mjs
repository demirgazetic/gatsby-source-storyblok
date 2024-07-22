"use client";
import n, { forwardRef as f } from "react";
import { useStoryblokState as m } from "./gatsby-source-storyblok8.mjs";
import i from "./gatsby-source-storyblok6.mjs";
f(
  ({ story: o, bridgeOptions: e, ...r }, t) => (typeof o.content == "string" && (o.content = JSON.parse(o.content)), o = m(o, e), /* @__PURE__ */ n.createElement(i, { ref: t, blok: o.content, ...r }))
);
