import { useState as a, useEffect as f } from "react";
const y = (e, r, o = {}) => {
  var i;
  const n = !(typeof window > "u") && typeof window.storyblokRegisterEvent < "u", d = +new URL((i = window.location) == null ? void 0 : i.href).searchParams.get(
    "_storyblok"
  ) === e;
  if (!n || !d)
    return;
  if (!e) {
    console.warn("Story ID is not defined. Please provide a valid ID.");
    return;
  }
  const c = () => fetch("__refresh", { method: "post" });
  window.storyblokRegisterEvent(() => {
    new window.StoryblokBridge(o).on(["input", "published", "change"], async (t) => {
      t.action === "input" && t.story.id === e ? r(t.story) : (t.action === "change" || t.action === "published") && t.storyId === e && (await c(), setTimeout(() => {
        window.location.reload();
      }, 50));
    });
  });
};
function p(e, r = {}) {
  typeof e.content == "string" && (e.content = JSON.parse(e.content));
  let [o, s] = a(e);
  return f(() => {
    y(
      o.internalId,
      (n) => s(n),
      r
    );
  }, []), o;
}
export {
  y as registerStoryblokBridge,
  y as useStoryblokBridge,
  p as useStoryblokState
};
