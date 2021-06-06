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

export default {
  ignore: [
    'prakritdictionary',
  ],

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Create only modern build
  // Ref: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-modern
  modern: process.env.NODE_ENV === 'production', // not needed in dev mode as it as it slows down the compile time very much

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jain-aagam',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // https://csswizardry.com/2020/05/the-fastest-google-fonts/
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
      {
        rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
        media: "print", onload: "this.media='all'"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/themes/vuetify-override.sass",],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-scrollactive.js',
    { src: '~/plugins/vue-dragscroll.js', ssr: false },
    '~/plugins/vue-tooltip.js',
    '~/plugins/directives',
    '~/plugins/vue-google-charts.js', // https://github.com/devstark-com/vue-google-charts
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'vue-scrollto/nuxt', // https://github.com/rigor789/vue-scrollTo
    '@nuxtjs/vuetify', // https://vuetifyjs.com/en/getting-started/installation/#nuxt-install
    "@nuxtjs/svg"

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-i18n'
  ],

  i18n: {
    locales: [{
      code: 'en',
      iso: 'en-US',
      name: 'English',
    }, {
      code: 'hi',
      iso: 'hi-IN',
      name: 'हिन्दी',
    }],
    defaultLocale: 'en',
    strategy: 'prefix',
    // noPrefixDefaultLocale: true,
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en-us.js'),
        hi: require('./locales/hi-in.js'),
      },

    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    tocDepth: 4,
    nestedProperties: ['aagam.title', 'order.cat', 'order.aagam', 'order.aagam.position', 'order.book', 'order.book.position', 'order.section', 'order.section.position', 'order.part', 'order.part.position', 'order.chapter', 'order.chapter.position', 'order.lesson', 'order.lesson.position', 'order.sutra', 'order.sutra.position', 'parent.type', 'children.type', 'children.count', 'children.children'],
    extendParser: {
      // https://github.com/nuxt/content/issues/432
    },
    markdown: {
      remarkPlugins: [
        ['remark-breaks'],
        // ['remark-directive'],
        // ['~/plugins/remark/directive-custom.js'],
        ['@silvenon/remark-smartypants', { dashes: 'oldschool' }],
        // ['remark-textr', { plugins: [textrCustom] }],
        // ['~/plugins/remark/contributors.js'],
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
    treeShake: process.env.NODE_ENV === 'production'
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

        document.dir = document.dir.endsWith('/') ? document.dir : document.dir + '/';
        document.path = document.path.endsWith('/') ? document.path : document.path + '/';
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
  },

  generate: {
    exclude: [//
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

  router: { trailingSlash: true },

}
