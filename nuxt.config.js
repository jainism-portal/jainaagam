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
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

  ],

  tailwindcss: {
    jit: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // ['nuxt-i18n', {
    //   locales: ['en', 'hi'],
    //   defaultLocale: 'en',
    //   vueI18n: {
    //     fallbackLocale: 'en',
    //     messages: {
    //       en: {
    //         welcome: 'Welcome'
    //       },
    //       hi: {
    //         welcome: 'नमस्ते'
    //       },
    //     }
    //   }
    // }]
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ['aagam.title', 'order.cat', 'order.aagam', 'order.aagam.position', 'order.book', 'order.book.position', 'order.section', 'order.section.position', 'order.part', 'order.part.position', 'order.chapter', 'order.chapter.position', 'order.lesson', 'order.lesson.position', 'order.sutra', 'order.sutra.position', 'parent.type', 'children.type', 'children.count', 'children.children'],
    extendParser: {
      // https://github.com/nuxt/content/issues/432
    },
    markdown: {
      remarkPlugins: [
        ['remark-breaks'],
        ['remark-directive'],
        ['~/plugins/remark/directive-custom.js'],
        ['@silvenon/remark-smartypants', { dashes: 'oldschool' }],
        // ['remark-textr', { plugins: [textrCustom] }],
        ['~/plugins/remark/contributors.js'],
      ]
    },
  },

  hooks: {
    'content:file:beforeParse': (file) => {
      if (file.extension !== '.md') {
        return
      }
      else {
        file.data = file.data.replace(/(?<=\p{sc=Deva})S(?=\p{sc=Deva})/gu, 'ऽ')
        // S to avagrah in Devanagari
      }
    },
    'content:file:beforeInsert': async (document, database) => {
      if (document.sutra) {
        document.sutra = {
          body: await database.markdown.generateBody(document.sutra),
        };
        // Now sutra has got a body, which makes it parse markdown content even in yaml.
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
