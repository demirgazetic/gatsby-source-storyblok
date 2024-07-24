import { useState as l, useEffect as u } from "react";
import { registerStoryblokBridge as d } from "./gatsby-source-storyblok5.mjs";
const p = (o = null, r = {}) => {
  const [n, t] = l(o), e = (o == null ? void 0 : o.internalId) ?? (o == null ? void 0 : o.id) ?? 0, i = typeof window < "u" && typeof window.storyblokRegisterEvent < "u";
  return u(() => {
    t(o), !(!i || !o) && d(
      e,
      (s) => t(s),
      r
    );
  }, [o]), n;
};
export {
  p as useStoryblokState
};
