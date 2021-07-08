<template>
  <div>
    <v-navigation-drawer
      app
      v-model="toggleMenu"
      class="!tw-z-50 !tw-min-h-[95vh] !tw-max-h-screen"
      clipped
    >
      <div class="tw-h-full">

        <div class="tw-py-3 lg:tw-hidden tw-border-b tw-border-gray-300 tw-flex tw-justify-center tw-items-center">
          <nuxt-link
            :to="'/'"
            class="tw-text-2xl tw-text-pink-700 tw-border-none"
          >
            ꣽ Jain Aagam
          </nuxt-link>
        </div>

        <div class="tw-h-[85%] tw-flex tw-flex-col tw-justify-between">

          <ol class="!tw-pl-0 tw-mt-0">
            <li
              v-for="menu in menus"
              :key="menu.text"
              class="tw-mx-1 tw-border-b tw-border-gray-200 hover:tw-border-pink-200"
            >
              <nuxt-link
                :to="menu.link"
                class="!tw-block tw-text-gray-800 tw-border-none tw-my-1 tw-px-4 tw-py-2 hover:tw-translate-x-1 "
              >
                {{menu.text}}
              </nuxt-link>
            </li>
          </ol>

          <footer class="tw-border-t tw-border-gray-300 tw-pt-2 tw-text-center">
            <v-icon>{{mdiStar}}</v-icon>
            <a
              href="https://github.com/jainism-portal/jainaagam"
              target="_blank"
              rel="noopener noreferrer"
              title="Jain Aagam Github repository"
              class="tw-border-gray-100 hover:tw-border-linkpink"
            >Star us on Github
              <v-icon small>{{mdiOpenInNew}}</v-icon>
            </a>
            <div class="tw-mt-3">
              <p class="!tw-my-0">&copy; CA Manas Madrecha</p>
              <ul class="!tw-pl-0 tw-mt-1 tw-flex tw-flex-wrap tw-justify-center tw-space-x-2 tw-items-center">
                <li
                  v-for="social in socials"
                  :key="social.link"
                >
                  <a
                    :href="social.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="tw-border-none hover:tw-scale-125"
                    :title="social.linkTitle"
                  >
                    <v-icon :class="`${social.color}`">{{social.icon}}</v-icon>
                  </a>
                  <span class="a11y-hide">{{social.linkTitle}}</span>
                </li>
              </ul>
            </div>
          </footer>

        </div>

      </div>
    </v-navigation-drawer>

    <v-app-bar
      app
      class="!tw-z-40"
      clipped-left
      flat
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right, white, #E0F7FA"
        >
        </v-img>
      </template>
      <v-icon
        @click.stop="toggleMenu = !toggleMenu"
        class="!tw-text-gray-500 tw-mx-2 tw-transform-gpu tw-transition-all hover:tw-scale-125 active:tw-scale-95 tw-scale-100"
      >{{mdiMenu}}</v-icon>

      <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
        <nuxt-link
          :to="'/'"
          class="tw-border-none tw-inline-block tw-mx-2 tw-p-2 !tw-text-pink-700 tw-font-semibold tw-text-2xl"
        >Jain Aagam</nuxt-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import {
  mdiOpenInNew,
  mdiMenu,
  mdiWeb,
  mdiGithub,
  mdiInstagram,
  mdiLinkedin,
  mdiStar
} from "@mdi/js";

export default {
  data() {
    return {
      mdiOpenInNew,
      mdiMenu,
      mdiStar,
      toggleMenu: this.$vuetify.breakpoint.mdAndUp,
      toggleSearch: false,
      menus: [
        { text: `🏠 Home`, link: `/` },
        { text: `🙏🏻 Acharanga`, link: `/acharanga` },
        { text: `🙏🏻 Sutrakritanga`, link: `/sutrakritanga` },
        // { text: `About`, link: `/about` },
        { text: `📁 Releases`, link: `/releases` }
      ],
      socials: [
        {
          link: `https://manas.madrecha.com`,
          linkTitle: `Manas Madrecha blog`,
          icon: mdiWeb,
          color: `!tw-text-gray-500`
        },
        {
          link: `https://github.com/ManasMadrecha`,
          linkTitle: `Manas Madrecha Github`,
          icon: mdiGithub,
          color: `!tw-text-gray-700`
        },
        {
          link: `https://instagram.com/ManasMadrecha`,
          linkTitle: `Manas Madrecha Instagram follow`,
          icon: mdiInstagram,
          color: `!tw-text-instagram`
        },
        {
          link: `https://www.linkedin.com/in/manasmadrecha/`,
          linkTitle: `Manas Madrecha LinkedIn connect`,
          icon: mdiLinkedin,
          color: `!tw-text-linkedin`
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.nav .nuxt-link-exact-active
  @apply tw-font-bold tw-bg-gray-100
</style>