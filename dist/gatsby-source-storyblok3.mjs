import { storyblokInit as s } from "./gatsby-source-storyblok5.mjs";
import { RichTextResolver as u, RichTextSchema as y, apiPlugin as d, registerStoryblokBridge as C, renderRichText as S, storyblokEditable as x, registerStoryblokBridge as f } from "./gatsby-source-storyblok5.mjs";
import { default as A } from "./gatsby-source-storyblok6.mjs";
let e = null, t = {}, r = !1, l = null;
const i = () => (e || console.error(
  "You can't use getStoryblokApi if you're not loading apiPlugin."
), e), b = (o) => t[o] ? t[o] : (console.error(`Component ${o} doesn't exist.`), !1), p = () => r, k = () => l, m = (o = {}) => {
  const { storyblokApi: n } = s(o);
  e = n, t = o.components, r = o.enableFallbackComponent, l = o.customFallbackComponent;
};
export {
  u as RichTextResolver,
  y as RichTextSchema,
  A as StoryblokComponent,
  d as apiPlugin,
  b as getComponent,
  k as getCustomFallbackComponent,
  p as getEnableFallbackComponent,
  i as getStoryblokApi,
  C as registerStoryblokBridge,
  S as renderRichText,
  x as storyblokEditable,
  m as storyblokInit,
  i as useStoryblokApi,
  f as useStoryblokBridge
};
