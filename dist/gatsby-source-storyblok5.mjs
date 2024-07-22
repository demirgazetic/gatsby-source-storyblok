let T = !1;
const _ = [], E = (o) => new Promise((t, e) => {
  if (typeof window > "u" || (window.storyblokRegisterEvent = (r) => {
    if (window.location === window.parent.location) {
      console.warn("You are not in Draft Mode or in the Visual Editor.");
      return;
    }
    T ? r() : _.push(r);
  }, document.getElementById("storyblok-javascript-bridge")))
    return;
  const s = document.createElement("script");
  s.async = !0, s.src = o, s.id = "storyblok-javascript-bridge", s.onerror = (r) => e(r), s.onload = (r) => {
    _.forEach((i) => i()), T = !0, t(r);
  }, document.getElementsByTagName("head")[0].appendChild(s);
});
var P = Object.defineProperty, I = (o, t, e) => t in o ? P(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e, h = (o, t, e) => (I(o, typeof t != "symbol" ? t + "" : t, e), e);
function j(o) {
  return !(o !== o || o === 1 / 0 || o === -1 / 0);
}
function C(o, t, e) {
  if (!j(t))
    throw new TypeError("Expected `limit` to be a finite number");
  if (!j(e))
    throw new TypeError("Expected `interval` to be a finite number");
  const s = [];
  let r = [], i = 0;
  const n = function() {
    i++;
    const a = setTimeout(function() {
      i--, s.length > 0 && n(), r = r.filter(function(u) {
        return u !== a;
      });
    }, e);
    r.indexOf(a) < 0 && r.push(a);
    const c = s.shift();
    c.resolve(o.apply(c.self, c.args));
  }, l = function(...a) {
    const c = this;
    return new Promise(function(u, p) {
      s.push({
        resolve: u,
        reject: p,
        args: a,
        self: c
      }), i < t && n();
    });
  };
  return l.abort = function() {
    r.forEach(clearTimeout), r = [], s.forEach(function(a) {
      a.reject(function() {
        Error.call(this, "Throttled function aborted"), this.name = "AbortError";
      });
    }), s.length = 0;
  }, l;
}
class b {
  constructor() {
    h(this, "isCDNUrl", (t = "") => t.indexOf("/cdn/") > -1), h(this, "getOptionsPage", (t, e = 25, s = 1) => ({
      ...t,
      per_page: e,
      page: s
    })), h(this, "delay", (t) => new Promise((e) => setTimeout(e, t))), h(this, "arrayFrom", (t = 0, e) => [...Array(t)].map(e)), h(this, "range", (t = 0, e = t) => {
      const s = Math.abs(e - t) || 0, r = t < e ? 1 : -1;
      return this.arrayFrom(s, (i, n) => n * r + t);
    }), h(this, "asyncMap", async (t, e) => Promise.all(t.map(e))), h(this, "flatMap", (t = [], e) => t.map(e).reduce((s, r) => [...s, ...r], [])), h(this, "escapeHTML", function(t) {
      const e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, s = /[&<>"']/g, r = RegExp(s.source);
      return t && r.test(t) ? t.replace(s, (i) => e[i]) : t;
    });
  }
  /**
   * @method stringify
   * @param  {Object} params
   * @param  {String} prefix
   * @param  {Boolean} isArray
   * @return {String} Stringified object
   */
  stringify(t, e, s) {
    const r = [];
    for (const i in t) {
      if (!Object.prototype.hasOwnProperty.call(t, i))
        continue;
      const n = t[i], l = s ? "" : encodeURIComponent(i);
      let a;
      typeof n == "object" ? a = this.stringify(
        n,
        e ? e + encodeURIComponent("[" + l + "]") : l,
        Array.isArray(n)
      ) : a = (e ? e + encodeURIComponent("[" + l + "]") : l) + "=" + encodeURIComponent(n), r.push(a);
    }
    return r.join("&");
  }
  /**
   * @method getRegionURL
   * @param  {String} regionCode region code, could be eu, us, cn, ap or ca
   * @return {String} The base URL of the region
   */
  getRegionURL(t) {
    const e = "api.storyblok.com", s = "api-us.storyblok.com", r = "app.storyblokchina.cn", i = "api-ap.storyblok.com", n = "api-ca.storyblok.com";
    switch (t) {
      case "us":
        return s;
      case "cn":
        return r;
      case "ap":
        return i;
      case "ca":
        return n;
      default:
        return e;
    }
  }
}
const A = function(o, t) {
  const e = {};
  for (const s in o) {
    const r = o[s];
    t.indexOf(s) > -1 && r !== null && (e[s] = r);
  }
  return e;
}, N = (o) => o === "email", M = () => ({
  singleTag: "hr"
}), L = () => ({
  tag: "blockquote"
}), z = () => ({
  tag: "ul"
}), U = (o) => ({
  tag: [
    "pre",
    {
      tag: "code",
      attrs: o.attrs
    }
  ]
}), H = () => ({
  singleTag: "br"
}), q = (o) => ({
  tag: `h${o.attrs.level}`
}), F = (o) => ({
  singleTag: [
    {
      tag: "img",
      attrs: A(o.attrs, ["src", "alt", "title"])
    }
  ]
}), B = () => ({
  tag: "li"
}), V = () => ({
  tag: "ol"
}), J = () => ({
  tag: "p"
}), D = (o) => ({
  tag: [
    {
      tag: "span",
      attrs: {
        "data-type": "emoji",
        "data-name": o.attrs.name,
        emoji: o.attrs.emoji
      }
    }
  ]
}), Y = () => ({
  tag: "b"
}), K = () => ({
  tag: "s"
}), W = () => ({
  tag: "u"
}), G = () => ({
  tag: "strong"
}), Q = () => ({
  tag: "code"
}), X = () => ({
  tag: "i"
}), Z = (o) => {
  if (!o.attrs)
    return {
      tag: ""
    };
  const t = new b().escapeHTML, e = { ...o.attrs }, { linktype: s = "url" } = o.attrs;
  if (delete e.linktype, e.href && (e.href = t(o.attrs.href || "")), N(s) && (e.href = `mailto:${e.href}`), e.anchor && (e.href = `${e.href}#${e.anchor}`, delete e.anchor), e.custom) {
    for (const r in e.custom)
      e[r] = e.custom[r];
    delete e.custom;
  }
  return {
    tag: [
      {
        tag: "a",
        attrs: e
      }
    ]
  };
}, tt = (o) => ({
  tag: [
    {
      tag: "span",
      attrs: o.attrs
    }
  ]
}), et = () => ({
  tag: "sub"
}), st = () => ({
  tag: "sup"
}), rt = (o) => ({
  tag: [
    {
      tag: "span",
      attrs: o.attrs
    }
  ]
}), it = (o) => {
  var t;
  return (t = o.attrs) != null && t.color ? {
    tag: [
      {
        tag: "span",
        attrs: {
          style: `background-color:${o.attrs.color};`
        }
      }
    ]
  } : {
    tag: ""
  };
}, nt = (o) => {
  var t;
  return (t = o.attrs) != null && t.color ? {
    tag: [
      {
        tag: "span",
        attrs: {
          style: `color:${o.attrs.color}`
        }
      }
    ]
  } : {
    tag: ""
  };
}, ot = {
  nodes: {
    horizontal_rule: M,
    blockquote: L,
    bullet_list: z,
    code_block: U,
    hard_break: H,
    heading: q,
    image: F,
    list_item: B,
    ordered_list: V,
    paragraph: J,
    emoji: D
  },
  marks: {
    bold: Y,
    strike: K,
    underline: W,
    strong: G,
    code: Q,
    italic: X,
    link: Z,
    styled: tt,
    subscript: et,
    superscript: st,
    anchor: rt,
    highlight: it,
    textStyle: nt
  }
}, at = function(o) {
  const t = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }, e = /[&<>"']/g, s = RegExp(e.source);
  return o && s.test(o) ? o.replace(e, (r) => t[r]) : o;
};
class k {
  constructor(t) {
    h(this, "marks"), h(this, "nodes"), t || (t = ot), this.marks = t.marks || [], this.nodes = t.nodes || [];
  }
  addNode(t, e) {
    this.nodes[t] = e;
  }
  addMark(t, e) {
    this.marks[t] = e;
  }
  render(t, e = { optimizeImages: !1 }) {
    if (t && t.content && Array.isArray(t.content)) {
      let s = "";
      return t.content.forEach((r) => {
        s += this.renderNode(r);
      }), e.optimizeImages ? this.optimizeImages(s, e.optimizeImages) : s;
    }
    return console.warn(
      `The render method must receive an Object with a "content" field.
			The "content" field must be an array of nodes as the type ISbRichtext.
			ISbRichtext:
				content?: ISbRichtext[]
				marks?: ISbRichtext[]
				attrs?: any
				text?: string
				type: string
				
				Example:
				{
					content: [
						{
							content: [
								{
									text: 'Hello World',
									type: 'text'
								}
							],
							type: 'paragraph'
						}
					],
					type: 'doc'
				}`
    ), "";
  }
  optimizeImages(t, e) {
    let s = 0, r = 0, i = "", n = "";
    typeof e != "boolean" && (typeof e.width == "number" && e.width > 0 && (i += `width="${e.width}" `, s = e.width), typeof e.height == "number" && e.height > 0 && (i += `height="${e.height}" `, r = e.height), (e.loading === "lazy" || e.loading === "eager") && (i += `loading="${e.loading}" `), typeof e.class == "string" && e.class.length > 0 && (i += `class="${e.class}" `), e.filters && (typeof e.filters.blur == "number" && e.filters.blur >= 0 && e.filters.blur <= 100 && (n += `:blur(${e.filters.blur})`), typeof e.filters.brightness == "number" && e.filters.brightness >= -100 && e.filters.brightness <= 100 && (n += `:brightness(${e.filters.brightness})`), e.filters.fill && (e.filters.fill.match(/[0-9A-Fa-f]{6}/g) || e.filters.fill === "transparent") && (n += `:fill(${e.filters.fill})`), e.filters.format && ["webp", "png", "jpeg"].includes(e.filters.format) && (n += `:format(${e.filters.format})`), typeof e.filters.grayscale == "boolean" && e.filters.grayscale && (n += ":grayscale()"), typeof e.filters.quality == "number" && e.filters.quality >= 0 && e.filters.quality <= 100 && (n += `:quality(${e.filters.quality})`), e.filters.rotate && [90, 180, 270].includes(e.filters.rotate) && (n += `:rotate(${e.filters.rotate})`), n.length > 0 && (n = "/filters" + n))), i.length > 0 && (t = t.replace(/<img/g, `<img ${i.trim()}`));
    const l = s > 0 || r > 0 || n.length > 0 ? `${s}x${r}${n}` : "";
    return t = t.replace(
      /a.storyblok.com\/f\/(\d+)\/([^.]+)\.(gif|jpg|jpeg|png|tif|tiff|bmp)/g,
      `a.storyblok.com/f/$1/$2.$3/m/${l}`
    ), typeof e != "boolean" && (e.sizes || e.srcset) && (t = t.replace(/<img.*?src=["|'](.*?)["|']/g, (a) => {
      var c, u;
      const p = a.match(
        /a.storyblok.com\/f\/(\d+)\/([^.]+)\.(gif|jpg|jpeg|png|tif|tiff|bmp)/g
      );
      if (p && p.length > 0) {
        const g = {
          srcset: (c = e.srcset) == null ? void 0 : c.map((d) => {
            if (typeof d == "number")
              return `//${p}/m/${d}x0${n} ${d}w`;
            if (typeof d == "object" && d.length === 2) {
              let v = 0, R = 0;
              return typeof d[0] == "number" && (v = d[0]), typeof d[1] == "number" && (R = d[1]), `//${p}/m/${v}x${R}${n} ${v}w`;
            }
          }).join(", "),
          sizes: (u = e.sizes) == null ? void 0 : u.map((d) => d).join(", ")
        };
        let f = "";
        return g.srcset && (f += `srcset="${g.srcset}" `), g.sizes && (f += `sizes="${g.sizes}" `), a.replace(/<img/g, `<img ${f.trim()}`);
      }
      return a;
    })), t;
  }
  renderNode(t) {
    const e = [];
    t.marks && t.marks.forEach((r) => {
      const i = this.getMatchingMark(r);
      i && i.tag !== "" && e.push(this.renderOpeningTag(i.tag));
    });
    const s = this.getMatchingNode(t);
    return s && s.tag && e.push(this.renderOpeningTag(s.tag)), t.content ? t.content.forEach((r) => {
      e.push(this.renderNode(r));
    }) : t.text ? e.push(at(t.text)) : s && s.singleTag ? e.push(this.renderTag(s.singleTag, " /")) : s && s.html ? e.push(s.html) : t.type === "emoji" && e.push(this.renderEmoji(t)), s && s.tag && e.push(this.renderClosingTag(s.tag)), t.marks && t.marks.slice(0).reverse().forEach((r) => {
      const i = this.getMatchingMark(r);
      i && i.tag !== "" && e.push(this.renderClosingTag(i.tag));
    }), e.join("");
  }
  renderTag(t, e) {
    return t.constructor === String ? `<${t}${e}>` : t.map((s) => {
      if (s.constructor === String)
        return `<${s}${e}>`;
      {
        let r = `<${s.tag}`;
        if (s.attrs)
          for (const i in s.attrs) {
            const n = s.attrs[i];
            n !== null && (r += ` ${i}="${n}"`);
          }
        return `${r}${e}>`;
      }
    }).join("");
  }
  renderOpeningTag(t) {
    return this.renderTag(t, "");
  }
  renderClosingTag(t) {
    return t.constructor === String ? `</${t}>` : t.slice(0).reverse().map((e) => e.constructor === String ? `</${e}>` : `</${e.tag}>`).join("");
  }
  getMatchingNode(t) {
    const e = this.nodes[t.type];
    if (typeof e == "function")
      return e(t);
  }
  getMatchingMark(t) {
    const e = this.marks[t.type];
    if (typeof e == "function")
      return e(t);
  }
  renderEmoji(t) {
    if (t.attrs.emoji)
      return t.attrs.emoji;
    const e = [
      {
        tag: "img",
        attrs: {
          src: t.attrs.fallbackImage,
          draggable: "false",
          loading: "lazy",
          align: "absmiddle"
        }
      }
    ];
    return this.renderTag(e, " /");
  }
}
class lt {
  constructor(t) {
    h(this, "baseURL"), h(this, "timeout"), h(this, "headers"), h(this, "responseInterceptor"), h(this, "fetch"), h(this, "ejectInterceptor"), h(this, "url"), h(this, "parameters"), h(this, "fetchOptions"), this.baseURL = t.baseURL, this.headers = t.headers || new Headers(), this.timeout = t != null && t.timeout ? t.timeout * 1e3 : 0, this.responseInterceptor = t.responseInterceptor, this.fetch = (...e) => t.fetch ? t.fetch(...e) : fetch(...e), this.ejectInterceptor = !1, this.url = "", this.parameters = {}, this.fetchOptions = {};
  }
  /**
   *
   * @param url string
   * @param params ISbStoriesParams
   * @returns Promise<ISbResponse | Error>
   */
  get(t, e) {
    return this.url = t, this.parameters = e, this._methodHandler("get");
  }
  post(t, e) {
    return this.url = t, this.parameters = e, this._methodHandler("post");
  }
  put(t, e) {
    return this.url = t, this.parameters = e, this._methodHandler("put");
  }
  delete(t, e) {
    return this.url = t, this.parameters = e, this._methodHandler("delete");
  }
  async _responseHandler(t) {
    const e = [], s = {
      data: {},
      headers: {},
      status: 0,
      statusText: ""
    };
    t.status !== 204 && await t.json().then((r) => {
      s.data = r;
    });
    for (const r of t.headers.entries())
      e[r[0]] = r[1];
    return s.headers = { ...e }, s.status = t.status, s.statusText = t.statusText, s;
  }
  async _methodHandler(t) {
    let e = `${this.baseURL}${this.url}`, s = null;
    if (t === "get") {
      const a = new b();
      e = `${this.baseURL}${this.url}?${a.stringify(
        this.parameters
      )}`;
    } else
      s = JSON.stringify(this.parameters);
    const r = new URL(e), i = new AbortController(), { signal: n } = i;
    let l;
    this.timeout && (l = setTimeout(() => i.abort(), this.timeout));
    try {
      const a = await fetch(`${r}`, {
        method: t,
        headers: this.headers,
        body: s,
        signal: n,
        ...this.fetchOptions
      });
      this.timeout && clearTimeout(l);
      const c = await this._responseHandler(
        a
      );
      return this.responseInterceptor && !this.ejectInterceptor ? this._statusHandler(this.responseInterceptor(c)) : this._statusHandler(c);
    } catch (a) {
      return {
        message: a
      };
    }
  }
  setFetchOptions(t = {}) {
    Object.keys(t).length > 0 && "method" in t && delete t.method, this.fetchOptions = { ...t };
  }
  eject() {
    this.ejectInterceptor = !0;
  }
  _statusHandler(t) {
    const e = /20[0-6]/g;
    return new Promise((s, r) => {
      if (e.test(`${t.status}`))
        return s(t);
      const i = {
        message: t.statusText,
        status: t.status,
        response: Array.isArray(t.data) ? t.data[0] : t.data.error || t.data.slug
      };
      r(i);
    });
  }
}
var ct = { npm_package_version: "6.6.3" };
const x = "SB-Agent", w = {
  defaultAgentName: "SB-JS-CLIENT",
  defaultAgentVersion: "SB-Agent-Version",
  packageVersion: ct.npm_package_version
};
let y = {};
const m = {};
class ht {
  /**
   *
   * @param config ISbConfig interface
   * @param endpoint string, optional
   */
  constructor(t, e) {
    h(this, "client"), h(this, "maxRetries"), h(this, "throttle"), h(this, "accessToken"), h(this, "cache"), h(this, "helpers"), h(this, "resolveCounter"), h(this, "relations"), h(this, "links"), h(this, "richTextResolver"), h(this, "resolveNestedRelations"), h(this, "stringifiedStoriesCache");
    let s = t.endpoint || e;
    const r = new b().getRegionURL, i = t.https === !1 ? "http" : "https";
    t.oauthToken ? s = `${i}://${r(t.region)}/v1` : s = `${i}://${r(t.region)}/v2`;
    const n = new Headers();
    if (n.set("Content-Type", "application/json"), n.set("Accept", "application/json"), t.headers)
      for (const a in t.headers)
        n.set(a, t.headers[a]);
    n.has(x) || (n.set(x, w.defaultAgentName), n.set(
      w.defaultAgentVersion,
      w.packageVersion
    ));
    let l = 5;
    t.oauthToken && (n.set("Authorization", t.oauthToken), l = 3), t.rateLimit && (l = t.rateLimit), t.richTextSchema ? this.richTextResolver = new k(t.richTextSchema) : this.richTextResolver = new k(), t.componentResolver && this.setComponentResolver(t.componentResolver), this.maxRetries = t.maxRetries || 5, this.throttle = C(this.throttledRequest, l, 1e3), this.accessToken = t.accessToken || "", this.relations = {}, this.links = {}, this.cache = t.cache || { clear: "manual" }, this.helpers = new b(), this.resolveCounter = 0, this.resolveNestedRelations = t.resolveNestedRelations || !0, this.stringifiedStoriesCache = {}, this.client = new lt({
      baseURL: s,
      timeout: t.timeout || 0,
      headers: n,
      responseInterceptor: t.responseInterceptor,
      fetch: t.fetch
    });
  }
  setComponentResolver(t) {
    this.richTextResolver.addNode("blok", (e) => {
      let s = "";
      return e.attrs.body && e.attrs.body.forEach((r) => {
        s += t(r.component, r);
      }), {
        html: s
      };
    });
  }
  parseParams(t) {
    return t.token || (t.token = this.getToken()), t.cv || (t.cv = m[t.token]), Array.isArray(t.resolve_relations) && (t.resolve_relations = t.resolve_relations.join(",")), t;
  }
  factoryParamOptions(t, e) {
    return this.helpers.isCDNUrl(t) ? this.parseParams(e) : e;
  }
  makeRequest(t, e, s, r) {
    const i = this.factoryParamOptions(
      t,
      this.helpers.getOptionsPage(e, s, r)
    );
    return this.cacheResponse(t, i);
  }
  get(t, e, s) {
    e || (e = {});
    const r = `/${t}`, i = this.factoryParamOptions(r, e);
    return this.client.setFetchOptions(s), this.cacheResponse(r, i);
  }
  async getAll(t, e, s, r) {
    const i = (e == null ? void 0 : e.per_page) || 25, n = `/${t}`, l = n.split("/"), a = s || l[l.length - 1], c = 1, u = await this.makeRequest(n, e, i, c), p = u.total ? Math.ceil(u.total / i) : 1;
    this.client.setFetchOptions(r);
    const g = await this.helpers.asyncMap(
      this.helpers.range(c, p),
      (f) => this.makeRequest(n, e, i, f + 1)
    );
    return this.helpers.flatMap(
      [u, ...g],
      (f) => Object.values(f.data[a])
    );
  }
  post(t, e, s) {
    const r = `/${t}`;
    return this.client.setFetchOptions(s), Promise.resolve(this.throttle("post", r, e));
  }
  put(t, e, s) {
    const r = `/${t}`;
    return this.client.setFetchOptions(s), Promise.resolve(this.throttle("put", r, e));
  }
  delete(t, e, s) {
    const r = `/${t}`;
    return this.client.setFetchOptions(s), Promise.resolve(this.throttle("delete", r, e));
  }
  getStories(t, e) {
    return this.client.setFetchOptions(e), this.get("cdn/stories", t);
  }
  getStory(t, e, s) {
    return this.client.setFetchOptions(s), this.get(`cdn/stories/${t}`, e);
  }
  getToken() {
    return this.accessToken;
  }
  ejectInterceptor() {
    this.client.eject();
  }
  _cleanCopy(t) {
    return JSON.parse(JSON.stringify(t));
  }
  _insertLinks(t, e, s) {
    const r = t[e];
    r && r.fieldtype == "multilink" && r.linktype == "story" && typeof r.id == "string" && this.links[s][r.id] ? r.story = this._cleanCopy(this.links[s][r.id]) : r && r.linktype === "story" && typeof r.uuid == "string" && this.links[s][r.uuid] && (r.story = this._cleanCopy(this.links[s][r.uuid]));
  }
  /**
   *
   * @param resolveId A counter number as a string
   * @param uuid The uuid of the story
   * @returns string | object
   */
  getStoryReference(t, e) {
    return this.relations[t][e] ? (this.stringifiedStoriesCache[e] || (this.stringifiedStoriesCache[e] = JSON.stringify(
      this.relations[t][e]
    )), JSON.parse(this.stringifiedStoriesCache[e])) : e;
  }
  _insertRelations(t, e, s, r) {
    s.indexOf(`${t.component}.${e}`) > -1 && (typeof t[e] == "string" ? t[e] = this.getStoryReference(r, t[e]) : Array.isArray(t[e]) && (t[e] = t[e].map((i) => this.getStoryReference(r, i)).filter(Boolean)));
  }
  iterateTree(t, e, s) {
    const r = (i) => {
      if (i != null) {
        if (i.constructor === Array)
          for (let n = 0; n < i.length; n++)
            r(i[n]);
        else if (i.constructor === Object) {
          if (i._stopResolving)
            return;
          for (const n in i)
            (i.component && i._uid || i.type === "link") && (this._insertRelations(
              i,
              n,
              e,
              s
            ), this._insertLinks(
              i,
              n,
              s
            )), r(i[n]);
        }
      }
    };
    r(t.content);
  }
  async resolveLinks(t, e, s) {
    let r = [];
    if (t.link_uuids) {
      const i = t.link_uuids.length, n = [], l = 50;
      for (let a = 0; a < i; a += l) {
        const c = Math.min(i, a + l);
        n.push(t.link_uuids.slice(a, c));
      }
      for (let a = 0; a < n.length; a++)
        (await this.getStories({
          per_page: l,
          language: e.language,
          version: e.version,
          by_uuids: n[a].join(",")
        })).data.stories.forEach(
          (c) => {
            r.push(c);
          }
        );
    } else
      r = t.links;
    r.forEach((i) => {
      this.links[s][i.uuid] = {
        ...i,
        _stopResolving: !0
      };
    });
  }
  async resolveRelations(t, e, s) {
    let r = [];
    if (t.rel_uuids) {
      const i = t.rel_uuids.length, n = [], l = 50;
      for (let a = 0; a < i; a += l) {
        const c = Math.min(i, a + l);
        n.push(t.rel_uuids.slice(a, c));
      }
      for (let a = 0; a < n.length; a++)
        (await this.getStories({
          per_page: l,
          language: e.language,
          version: e.version,
          by_uuids: n[a].join(","),
          excluding_fields: e.excluding_fields
        })).data.stories.forEach((c) => {
          r.push(c);
        });
    } else
      r = t.rels;
    r && r.length > 0 && r.forEach((i) => {
      this.relations[s][i.uuid] = {
        ...i,
        _stopResolving: !0
      };
    });
  }
  /**
   *
   * @param responseData
   * @param params
   * @param resolveId
   * @description Resolves the relations and links of the stories
   * @returns Promise<void>
   *
   */
  async resolveStories(t, e, s) {
    var r, i;
    let n = [];
    if (this.links[s] = {}, this.relations[s] = {}, typeof e.resolve_relations < "u" && e.resolve_relations.length > 0 && (typeof e.resolve_relations == "string" && (n = e.resolve_relations.split(",")), await this.resolveRelations(t, e, s)), e.resolve_links && ["1", "story", "url", "link"].indexOf(e.resolve_links) > -1 && ((r = t.links) != null && r.length || (i = t.link_uuids) != null && i.length) && await this.resolveLinks(t, e, s), this.resolveNestedRelations)
      for (const l in this.relations[s])
        this.iterateTree(
          this.relations[s][l],
          n,
          s
        );
    t.story ? this.iterateTree(t.story, n, s) : t.stories.forEach((l) => {
      this.iterateTree(l, n, s);
    }), this.stringifiedStoriesCache = {}, delete this.links[s], delete this.relations[s];
  }
  async cacheResponse(t, e, s) {
    (typeof s > "u" || !s) && (s = 0);
    const r = this.helpers.stringify({ url: t, params: e }), i = this.cacheProvider();
    if (this.cache.clear === "auto" && e.version === "draft" && await this.flushCache(), e.version === "published" && t != "/cdn/spaces/me") {
      const n = await i.get(r);
      if (n)
        return Promise.resolve(n);
    }
    return new Promise(async (n, l) => {
      var a;
      try {
        const c = await this.throttle("get", t, e);
        if (c.status !== 200)
          return l(c);
        let u = { data: c.data, headers: c.headers };
        if ((a = c.headers) != null && a["per-page"] && (u = Object.assign({}, u, {
          perPage: c.headers["per-page"] ? parseInt(c.headers["per-page"]) : 0,
          total: c.headers["per-page"] ? parseInt(c.headers.total) : 0
        })), u.data.story || u.data.stories) {
          const p = this.resolveCounter = ++this.resolveCounter % 1e3;
          await this.resolveStories(u.data, e, `${p}`);
        }
        return e.version === "published" && t != "/cdn/spaces/me" && await i.set(r, u), u.data.cv && e.token && (e.version === "draft" && m[e.token] != u.data.cv && await this.flushCache(), m[e.token] = e.cv ? e.cv : u.data.cv), n(u);
      } catch (c) {
        if (c.response && c.status === 429 && (s = s ? s + 1 : 0, s < this.maxRetries))
          return console.log(`Hit rate limit. Retrying in ${s} seconds.`), await this.helpers.delay(1e3 * s), this.cacheResponse(t, e, s).then(n).catch(l);
        l(c);
      }
    });
  }
  throttledRequest(t, e, s) {
    return this.client[t](e, s);
  }
  cacheVersions() {
    return m;
  }
  cacheVersion() {
    return m[this.accessToken];
  }
  setCacheVersion(t) {
    this.accessToken && (m[this.accessToken] = t);
  }
  cacheProvider() {
    switch (this.cache.type) {
      case "memory":
        return {
          get(t) {
            return Promise.resolve(y[t]);
          },
          getAll() {
            return Promise.resolve(y);
          },
          set(t, e) {
            return y[t] = e, Promise.resolve(void 0);
          },
          flush() {
            return y = {}, Promise.resolve(void 0);
          }
        };
      case "custom":
        if (this.cache.custom)
          return this.cache.custom;
      default:
        return {
          get() {
            return Promise.resolve();
          },
          getAll() {
            return Promise.resolve(void 0);
          },
          set() {
            return Promise.resolve(void 0);
          },
          flush() {
            return Promise.resolve(void 0);
          }
        };
    }
  }
  async flushCache() {
    return await this.cacheProvider().flush(), this;
  }
}
const pt = (o = {}) => {
  const { apiOptions: t } = o;
  if (!t.accessToken) {
    console.error(
      "You need to provide an access token to interact with Storyblok API. Read https://www.storyblok.com/docs/api/content-delivery#topics/authentication"
    );
    return;
  }
  return { storyblokApi: new ht(t) };
}, dt = (o) => {
  if (typeof o != "object" || typeof o._editable > "u")
    return {};
  try {
    const t = JSON.parse(
      o._editable.replace(/^<!--#storyblok#/, "").replace(/-->$/, "")
    );
    return t ? {
      "data-blok-c": JSON.stringify(t),
      "data-blok-uid": t.id + "-" + t.uid
    } : {};
  } catch {
    return {};
  }
};
let $, S = "https://app.storyblok.com/f/storyblok-v2-latest.js";
const gt = (o, t, e = {}) => {
  var s;
  const r = !(typeof window > "u") && typeof window.storyblokRegisterEvent < "u", i = +new URL((s = window.location) == null ? void 0 : s.href).searchParams.get(
    "_storyblok"
  ) === o;
  if (!(!r || !i)) {
    if (!o) {
      console.warn("Story ID is not defined. Please provide a valid ID.");
      return;
    }
    window.storyblokRegisterEvent(() => {
      new window.StoryblokBridge(e).on(["input", "published", "change"], (n) => {
        n.action === "input" && n.story.id === o ? t(n.story) : (n.action === "change" || n.action === "published") && n.storyId === o && window.location.reload();
      });
    });
  }
}, ft = (o = {}) => {
  var t, e;
  const {
    bridge: s,
    accessToken: r,
    use: i = [],
    apiOptions: n = {},
    richText: l = {},
    bridgeUrl: a
  } = o;
  n.accessToken = n.accessToken || r;
  const c = { bridge: s, apiOptions: n };
  let u = {};
  i.forEach((g) => {
    u = { ...u, ...g(c) };
  }), a && (S = a);
  const p = !(typeof window > "u") && ((e = (t = window.location) == null ? void 0 : t.search) == null ? void 0 : e.includes("_storyblok_tk"));
  return s !== !1 && p && E(S), $ = new k(l.schema), l.resolver && O($, l.resolver), u;
}, O = (o, t) => {
  o.addNode("blok", (e) => {
    let s = "";
    return e.attrs.body.forEach((r) => {
      s += t(r.component, r);
    }), {
      html: s
    };
  });
}, ut = (o) => !o || !(o != null && o.content.some((t) => t.content || t.type === "blok" || t.type === "horizontal_rule")), mt = (o, t, e) => {
  let s = e || $;
  if (!s) {
    console.error(
      "Please initialize the Storyblok SDK before calling the renderRichText function"
    );
    return;
  }
  return ut(o) ? "" : (t && (s = new k(t.schema), t.resolver && O(s, t.resolver)), s.render(o));
};
export {
  k as RichTextResolver,
  ot as RichTextSchema,
  pt as apiPlugin,
  ut as isRichTextEmpty,
  gt as registerStoryblokBridge,
  mt as renderRichText,
  dt as storyblokEditable,
  ft as storyblokInit,
  gt as useStoryblokBridge
};
