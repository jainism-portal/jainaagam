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
    ['nuxt-i18n', {
      locales: ['en', 'fr', 'es'],
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        messages: {
          en: {
            welcome: 'Welcome'
          },
          fr: {
            welcome: 'Bienvenue'
          },
          es: {
            welcome: 'Bienvenido'
          }
        }
      }
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ['depth.aagam', 'depth.chapter', 'depth.lesson', 'depth.sutra'],
    extendParser: {
      // https://github.com/nuxt/content/issues/432
    }

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
