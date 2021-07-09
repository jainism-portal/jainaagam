<template>
  <!-- NOT WORKING. IGNORE THIS PAGE -->
  <div>
    <pre>
      {{textMethod()}}
    </pre>
  </div>
</template>

<script>
let unified = require("unified");
let remarkParse = require("remark-parse");

import visit from "unist-util-visit";
import toString from "mdast-util-to-string";
// import fromMarkdown from "mdast-util-from-markdown";
// import toMarkdown from "mdast-util-to-markdown";
// const findAfter = require("unist-util-find-after");
// import { findAllAfter } from "unist-util-find-all-after";
// import { selectAll } from "unist-util-select";

// let remarkStringify = require("remark-stringify");
// let remarkRehype = require("remark-rehype");
let rehypeRaw = require("rehype-raw");
// let rehypeStringify = require("rehype-stringify");
// let rehypeParse = require("rehype-parse");
// let rehypeSanitize = require('rehype-sanitize')

export default {
  data() {
    return {
      text: `hello`,
      input: `
<dl><dt>hello</dt><dd>lorem</dd><dt>hello2</dt><dd>lorem2</dd><dd>lorem2a</dd></dl>
`
    };
  },
  methods: {
    convert() {
      let tree = unified()
        // .use(rehypeParse, { fragment: true })
        .use({ settings: { position: false } })
        .parse(this.input);

      visit(
        tree,
        node => node.tagName === "dd" || node.tagName === "dt",
        // node => node.tagName === "dl",
        (node, index, parent) => {
          // let dl = parent.find(par => par.tagName === "dl");

          // console.log(node.tagName, index, parent);

          let parentMapped = parent.children.map((child, i) => {
            if (child.tagName === "dt") {
              child.properties.dataIndex = i;
            }
            return child;
          });
          // .filter(child => child.tagName === "dt");

          let abc = [];

          // parent.children.forEach((child, i) => {
          //   // child.properties.dataIndex
          //   console.log(i);
          // });

          for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children[i];
          }

          // if (node.properties.dataIndex) {
          //   abc = findAllAfter(parent, node, node => node.tagName !== "dt");
          // }

          // console.log(abc);

          // terms = terms.map(term => {
          //   term.i = index;
          //   return term;
          // });

          // console.log(terms);

          // let dt = node.children.find(child => child.tagName === "dt");

          // console.log(
          //   findAllAfter(
          //     parent,
          //     parent.children.findIndexOf(child => {})
          //   )
          // );

          let children = [
            {
              type: "element",
              tagName: "dt",
              properties: {},
              children: [
                {
                  type: "text",
                  value: "hello"
                }
              ]
            },
            {
              type: "element",
              tagName: "dd",
              properties: {},
              children: [
                {
                  type: "text",
                  value: "lorem"
                }
              ]
            },
            {
              type: "element",
              tagName: "dt",
              properties: {},
              children: [
                {
                  type: "text",
                  value: "hello2"
                }
              ]
            },
            {
              type: "element",
              tagName: "dd",
              properties: {},
              children: [
                {
                  type: "text",
                  value: "lorem2"
                }
              ]
            }
          ];

          // let children = [...dl.children];
          // let div = {
          //   type: "element",
          //   tagName: "div",
          //   properties: {},
          //   children: children
          // };

          // dl.children.splice(0, children.length, div);

          // if (node.tagName === "dd") {
          //   let dl = parent.filter(par => par.tagName === "dl");
          //   let dlEl = dl ? dl[0] : {};

          //   // dlEl.children.unshift(div);
          //   console.log(div);

          //   // parent[1].children.splice(0, 1, div);
          // }
        }
      );

      return tree;
    },
    textMethod() {
      let tree = unified()
        .use(remarkParse, { fragment: true })
        .use({ settings: { position: false } })
        .parse(this.text);

      const isSingleDeflist = node =>
        // i > 0 &&
        /^[^:].+\n:\s/.test(toString(node)) && node.type === "paragraph";

      const isSplitDeflist = (node, i, parent) =>
        i > 0 &&
        /^:\s/.test(toString(node)) &&
        !/^:\s/.test(toString(parent.children[i - 1])) &&
        node.type === "paragraph" &&
        parent.children[i - 1].type === "paragraph";

      const isdeflist = (node, i, parent) =>
        isSingleDeflist(node) || isSplitDeflist(node, i, parent);

      visit(tree, ["paragraph"], (node, i, parent) => {
        const isdef = isdeflist(node, i, parent);
        if (!isdef) {
          return;
        }

        let dd = undefined;
        let dt = undefined;
        let count = 0;
        let start = 0;

        if (isSingleDeflist(node)) {
          const [title, ...children] = toMarkdown(node).split(/\n:\s+/);

          dt = fromMarkdown(title).children.flatMap(({ children }) => children);
          dd = children
            .map(fromMarkdown)
            .flatMap(({ children }) => children)
            .map(({ children }) => ({
              type: "descriptiondetails",
              data: {
                hName: "dd"
              },
              children
            }));
          start = i;
          count = 1;
        } else {
          dt = parent.children[i - 1].children;
          dd = toMarkdown(node)
            .replace(/^:\s+/, "")
            .split(/\n:\s+/)
            .map(fromMarkdown)
            .flatMap(({ children }) => children)
            .map(({ children }) => ({
              type: "descriptiondetails",
              data: {
                hName: "dd"
              },
              children
            }));
          start = i - 1;
          count = 2;
        }

        const child = {
          type: "descriptionlist",
          data: {
            hName: "dl"
          },
          children: [
            {
              type: "descriptionterm",
              data: {
                hName: "dt"
              },
              children: dt
            },
            ...dd
          ]
        };

        parent.children.splice(start, count, child);
      });

      // Merge subsequent definition lists into a single list (#10)
      visit(tree, ["descriptionlist"], (node, i, parent) => {
        const start = i;
        let count = 1;
        let children = node.children;

        for (let j = i + 1; j < parent.children.length; j++) {
          const next = parent.children[j];
          if (next.type === "descriptionlist") {
            count++;
            children = children.concat(next.children);
          } else {
            break;
          }
        }

        if (count === 1) {
          return;
        }

        node.children = children;

        parent.children.splice(start, count, node);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>