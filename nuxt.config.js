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
        ['remark-toc', { ordered: true }],
        ['remark-emoji', { emoticon: false }],
        ['remark-directive'],
      ],
      // rehypePlugins: [
      //   ['rehype-document'],
      //   ['rehype-format'],
      //   ['rehype-stringify'],
      // ]
    },
  },

  hooks: {
    // Due to this hook, sutra has got a body, which makes it parse markdown content even in yaml.

    'content:file:beforeInsert': async (document, database) => {
      if (document.sutra) {
        document.sutra = {
          body: await database.markdown.generateBody(document.sutra),
        };
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
