import { useState as l, useEffect as u } from "react";
import { registerStoryblokBridge as d } from "./gatsby-source-storyblok5.mjs";
const p = (t = null, r = {}) => {
  const [n, o] = l(t), i = (t == null ? void 0 : t.internalId) ?? (t == null ? void 0 : t.id) ?? 0, s = typeof window < "u" && typeof window.storyblokRegisterEvent < "u";
  return u(() => {
    o(t), !(!s || !t) && d(
      i,
      (e) => o(e),
      r
    );
  }, [t]), n;
};
export {
  p as useStoryblokState
};
