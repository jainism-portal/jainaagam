let unified = require("unified");
let remarkParse = require("remark-parse");
// let remarkStringify = require("remark-stringify");
let remarkRehype = require("remark-rehype");
let rehypeRaw = require('rehype-raw')
let rehypeStringify = require("rehype-stringify");
let rehypeParse = require("rehype-parse");
// let rehypeSanitize = require('rehype-sanitize')

// import { toHast } from 'mdast-util-to-hast'

import { flatten } from "flat";
const unflatten = require("flat").unflatten;

let releases = []

function bodyGenerate(content) {
  let text = content;
  text =
    unified()
      .use(remarkParse, { verbose: false }) // Parse markdown content to a syntax tree
      // .use(remarkStringify)
      // .use(remarkRehype, { allowDangerousHtml: true }) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
      // .use(remarkStringify)
      // .use(rehypeParse, { fragment: true }) // Serialize HTML syntax tree
      .parse(content);
  // let body = { body: text };
  // let flatBody = flatten(body);

  // flatBody = Object.entries(flatBody).filter(([key, value]) => {
  //   return !key.includes("position");
  // });
  // flatBody = Object.fromEntries(flatBody);
  // let unflatBody = unflatten(flatBody);
  return text;
}

export default async function () {
  await fetch(
    "https://api.github.com/repos/jainism-portal/jainaagam/releases"
  )
    .then(res => res.json())
    .then(
      res =>
      (releases = res
        .filter(r => !r.draft)
        .map(release => {
          return {
            url: release.html_url,
            name: release.name,
            tagName: release.tag_name,
            createdAt: release.created_at,
            publishedAt: release.published_at,
            body: bodyGenerate(release.body)
          };
        }))
    );
  return releases
}