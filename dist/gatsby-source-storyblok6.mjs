import e, { forwardRef as a } from "react";
import { getComponent as m, getEnableFallbackComponent as p, getCustomFallbackComponent as c } from "./gatsby-source-storyblok3.mjs";
const u = a(
  ({ blok: o, ...t }, l) => {
    if (!o)
      return console.error(
        "Please provide a 'blok' property to the StoryblokComponent"
      ), /* @__PURE__ */ e.createElement("div", null, "Please provide a blok property to the StoryblokComponent");
    const n = m(o.component);
    if (n)
      return /* @__PURE__ */ e.createElement(n, { ref: l, blok: o, ...t });
    if (p()) {
      const r = c();
      return r ? /* @__PURE__ */ e.createElement(r, { blok: o, ...t }) : /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("p", null, "Component could not be found for blok", " ", /* @__PURE__ */ e.createElement("strong", null, o.component), "! Is it configured correctly?"));
    }
    return /* @__PURE__ */ e.createElement("div", null);
  }
);
u.displayName = "StoryblokComponent";
export {
  u as default
};
