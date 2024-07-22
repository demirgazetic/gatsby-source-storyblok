"use client";
"use strict";const t=require("react"),s=require("./gatsby-source-storyblok8.js"),c=require("./gatsby-source-storyblok6.js");t.forwardRef(({story:e,bridgeOptions:o,...n},r)=>(typeof e.content=="string"&&(e.content=JSON.parse(e.content)),e=s.useStoryblokState(e,o),t.createElement(c,{ref:r,blok:e.content,...n})));
