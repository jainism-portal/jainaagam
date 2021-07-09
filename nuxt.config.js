// function textrCustom(input) {
//   return input
//   // S to avagrah in Devanagari
//   // .replace(/(?<=\p{sc=Deva})S(?=\p{sc=Deva})/gu, 'ऽ')

//   // Commented these as installed @silvenon/remark-smartypants
//   // //  3 dots to ellipses
//   // .replace(/\.{3}/gim, '…')
//   // // 3 dashes to emdash
//   // .replace(/\-{3}/gim, '—')
//   // // 2 dashes to endash
//   // .replace(/\-{2}/gim, '–')

// }

import { mdiOpenInNew } from "@mdi/js"; // For remark-external-links

import appLanguages from "./app/langs";

export default {
  ignore: [
    'prakritdictionary',
  ],

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Create only modern build
  // Ref: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern
  // https://github.com/nuxt/nuxt.js/issues/4552#issuecomment-761786540
  // modern: "client",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Jain Aagam"
      },
      { hid: "og:type", property: "og:type", content: "website" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: ""
      },
      {
        rel: "preconnect",
        href: "https://www.google-analytics.com",
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tailwind.sass'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-disqus.js', mode: 'client' },
    { src: '~/plugins/ga.js', mode: 'client' }, // Google Analytics, only on Browser, not on server
    '~/plugins/vue-scrollactive.js',
    '~/plugins/vue-google-charts.js', // https://github.com/devstark-com/vue-google-charts
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/vuetify', // https://vuetifyjs.com/en/getting-started/installation/#nuxt-install
    "@nuxtjs/svg"

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://aagam.jainism.info',
    gzip: true,
    exclude: [
      '/prakritdictionary',
    ],
    routes: async () => {
      const { $content } = require('@nuxt/content')

      let metaPosts = [], langPosts = [], allPosts = [], routes = [];

      metaPosts = await $content("aagam", { deep: true })
        .without("body")
        .where({
          $and: [
            { slug: "meta" },
            {
              dirWithoutAagam: {
                $regex: `^` + `/acharanga` + `|` + `/sutrakritanga`
              } // in future, update this as and when new aagam are added
            },
            { show: { $ne: false } }
          ]
        })
        .sortBy("paddedDepth", "asc")
        .sortBy("path", "asc")
        .fetch();

      for (const metaPost of metaPosts) {
        let langPostsOfDir = await $content("aagam", { deep: true })
          .without(["body", "toc"])
          .where({
            $and: [
              { dir: metaPost.dir },
              { slug: { $ne: "original" } },
              { slug: { $ne: "en" } },
              { slug: { $ne: "meta" } },
              { show: { $ne: false } }
            ]
          })
          .sortBy("langPosition")
          .fetch();

        langPosts.push(langPostsOfDir);
      }
      langPosts = langPosts.flat();

      metaPosts.map(metaPost => {
        metaPost.langs = [];

        for (const langPost of langPosts) {
          if (langPost.dir === metaPost.dir) {
            metaPost.langs.push(langPost.slug);
            metaPost.langs = [...new Set(metaPost.langs)];
            metaPost.langs = metaPost.langs.filter(
              lang => !lang.startsWith("sutra")
            );
          }
        }
        metaPost.langs.push("en", "x-default");
        return metaPost;
      });

      langPosts.map(langPost => {
        langPost.langs = [];

        for (const metaPost of metaPosts) {
          if (metaPost.dir === langPost.dir) {
            langPost.langs.push(metaPost.langs);
          }
        }
        langPost.langs = langPost.langs.flat();
        return langPost;
      });

      allPosts = [...metaPosts, ...langPosts];

      for (const post of allPosts) {
        post.langs = post.langs ? post.langs : [];

        routes.push({
          url:
            post.slug === "meta"
              ? `${post.dirWithoutAagam}/`
              : `${post.pathWithoutAagam}/`,
          changefreq: "daily",
          lastmod: post.updatedAt,
          links: post.langs.map(lang => {
            let url =
              lang === "en" || lang === "x-default"
                ? `${post.dirWithoutAagam}/`
                : `${post.dirWithoutAagam}/${lang}/`;

            return {
              lang: lang,
              url: url
            };
          })
        });
      }
      return routes;
    },
    filter({ routes }) {
      return routes.map((route) => {
        return {
          url: route.url.endsWith(`/`) ? route.url : `${route.url}/`, // Slash
          changefreq: route.changefreq ? route.changefreq : 'daily',
          lastmod: route.lastmod ? route.lastmod : new Date(),
          links: route.links
        }
      })
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    dir: 'content-jainaagam',
    tocDepth: 4,
    nestedProperties: ['body.children', 'aagam.title', 'order.cat', 'order.aagam', 'order.aagam.position', 'order.book', 'order.book.position', 'order.section', 'order.section.position', 'order.part', 'order.part.position', 'order.chapter', 'order.chapter.position', 'order.lesson', 'order.lesson.position', 'order.sutra', 'order.sutra.position', 'parent.type', 'children.type', 'children.count', 'children.children'],
    extendParser: {
      // https://github.com/nuxt/content/issues/432
    },
    markdown: {
      remarkPlugins: [
        ['remark-breaks'],
        ['remark-autolink-headings', { behavior: 'append' }],
        ['remark-external-links', {
          target: '_blank',
          rel: 'noopener noreferrer',
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              'aria-hidden': "true",
              className: ["tw-w-4", "tw-h-4", "tw-ml-1", "tw-fill-current"],
              role: "img",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: { d: mdiOpenInNew }
              }
            ]
          },
          contentProperties: {
            'aria-hidden': "true",
            className: ["tw-inline-flex", "tw-justify-center", "tw-items-center", "tw-align-middle", "tw-text-gray-600"]
          },
        }],
        ['~/plugins/remark/git-releases.js'],
        // ['remark-directive'],
        // ['~/plugins/remark/directive-custom.js'],
        ['@silvenon/remark-smartypants', { dashes: 'oldschool' }],
        // ['remark-textr', { plugins: [textrCustom] }],
      ],
      prism: {
        theme: '~/assets/css/themes/prism-ghcolors.css'
      }
    },
    liveEdit: false,
    // fullTextSearchFields: ['title', 'description', 'text', 'slug']
  },

  vuetify: {
    customVariables: ['~/assets/css/themes/vuetify-variables.sass'],
    optionsPath: '~/plugins/vuetify.js',
    defaultAssets: false,
    treeShake: true // process.env.NODE_ENV === 'production'
  },

  hooks: {
    'content:file:beforeParse': (file) => {
      if (file.extension !== '.md') {
        return
      }
      else {
        file.data = file.data.replace(/(?<=\p{sc=Deva})S(?=\p{sc=Deva})/gu, 'ऽ')
        // S to avagrah in Devanagari

        if (file.path.match(/\\content\\hi\\/gi)) {
          // only on Hindi locale
          file.data = file.data.replace("## Meaning", "## अर्थ")
          file.data = file.data.replace("## Explanation", "## विवेचन")
        }
      }
    },
    'content:file:beforeInsert': async (document, database) => {
      if (document.extension === '.md') {
        const { time } = require('reading-time')(document.text)
        document.readingTime = time;

        document.slugurl = document.dir.slice(1 + document.dir.lastIndexOf('/'))
        document.dirWithoutAagam = document.dir.slice(6)  // 6 is "/aagam"
        document.pathWithoutAagam = document.path.slice(6)  // 6 is "/aagam"

        document.pathWithSlash = document.path.endsWith(`/`)
          ? document.path
          : `${document.path}/`;

        // For individual release files (which is not what I want)

        // if (document.$releaseBody) {
        //   document.$releaseBody = {
        //     body: await database.markdown.generateBody(document.$releaseBody),
        //   };
        // }

        // This is for a single releases file.
        if (document.$releases) {
          document.$releases.map(async release => {
            release.body = {
              body: await database.markdown.generateBody(release.body),
            };
            return release
          })
        }

        if (document.slug === 'meta') {
          document.langPosition = 0
        }

        if (document.slug !== 'meta') {
          if (document.slug === 'original') {
            document.langPosition = 1
          } else {

            const langs = appLanguages

            const langIndex = langs.indexOf(document.slug)
            const isLangSlugCorrect = langIndex === -1 ? false : true

            document.langPosition = document.slug === 'en' ? 2 : isLangSlugCorrect ? langIndex + 3 : 999

          }
        }

        if (document.slug === 'meta' || document.slug === 'original') {
          let depths = [], depthsWithEqualLength = [], paddedDepths = [];

          depths = document.pathWithSlash.match(/\d+(?=\/)/g) || []

          if (depths.length) {
            document.depth = depths.join('.')

            for (let i = 0; i < 6; i++) {
              depthsWithEqualLength.push(typeof depths[i] === "undefined" ? "0" : depths[i]);
            }

            paddedDepths = depthsWithEqualLength.map(dep => dep.toString().padStart(6, "0"))
            document.paddedDepth = paddedDepths.join('.')
          }
        }

      }
      if (document.sutra) {
        document.sutra = {
          body: await database.markdown.generateBody(document.sutra),
        };
        // Now sutra has got a body, which makes it parse markdown content even in yaml.
        // https://github.com/nuxt/content/issues/628
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[name].[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
    },
    // https://github.com/nuxt/nuxt.js/issues/4552#issuecomment-761786540
    // https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
    // https://web.dev/codelab-serve-modern-code/
    babel: {
      presets({ isClient }, preset) {
        if (isClient) {
          preset[1].targets = {
            browsers: [
              'Chrome >= 60',
              'Safari >= 10.1',
              'iOS >= 10.3',
              'Firefox >= 54',
              'Edge >= 15',
            ]
          }
        }
        return [preset]
      }
    },
  },
  generate: {
    exclude: [
      'sitemap-test'
    ],
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate#fallback
    fallback: '404.html',
    cache: {
      ignore: [
        '.nuxt', // buildDir
        'static', // dir.static
        'dist', // generate.dir
        'node_modules',
        '.**/*',
        '.*',
        'README.md',
        'archivecode', // archive folder
        // 'content-draft', // content draft folder
        'firebase.json' // firebase file (including redirects)
      ]
    }
  },

  // router: { trailingSlash: true },

}
