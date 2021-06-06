<template>
  <div>
    <v-navigation-drawer
      app
      v-model="toggleMenu"
      class="!tw-z-50"
      clipped
    >
      <template #prepend>
        <v-card v-if="$vuetify.breakpoint.smAndDown">
          <v-card-title>
            <nuxt-link
              :to="localePath('/')"
              class="!tw-text-pink-600"
            >
              <v-icon
                left
                class="!tw-text-pink-600"
              >{{mdiHome}}</v-icon>

              {{$t("jain")}} {{$t("aagam")}}

            </nuxt-link>
          </v-card-title>
        </v-card>
      </template>

      <div class="tw-mt-6 tw-mx-3 tw-text-gray-600">
        <language-input></language-input>
      </div>

      <template #append>
        <footer class="tw-p-2">
          &copy; CA Manas Madrecha
        </footer>
        <div class="tw-flex tw-mx-2">
          <!-- v-if="$vuetify.breakpoint.smAndDown" -->
          <a
            v-for="social in socials"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            class="tw-block tw-p-2 tw-rounded-xl hover:tw-shadow"
            :class="`hover:tw-bg-${social.color}-50`"
            :title="social.linkTitle"
          >
            <v-icon
              :role="social.iconRole"
              :class="`!tw-text-${social.color}-600`"
            >{{social.icon}}</v-icon>
          </a>
        </div>
      </template>
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
        role="menu"
        @click.stop="toggleMenu = !toggleMenu"
        class="!tw-text-gray-500 tw-mx-2 tw-transform hover:tw-scale-125 tw-transition-transform"
      >{{mdiMenu}}</v-icon>

      <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
        <div class="tw-mx-2">
          <nuxt-link
            :to="localePath('/')"
            class="tw-inline-block tw-p-2 !tw-text-pink-700 tw-font-semibold tw-text-xl md:tw-text-2xl tw-transform hover:tw--skew-x-6 tw-transition-transform"
          >{{$t("jain")}} {{$t("aagam")}}</nuxt-link>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import LanguageInput from "~/components/LanguageInput";

import {
  mdiMenu,
  mdiHome,
  mdiMagnify,
  // mdiBookEditOutline,
  // mdiSortAlphabeticalVariant,
  // mdiTagMultiple,
  // mdiPackage,
  mdiGithub,
  mdiInstagram,
  mdiLinkedin
} from "@mdi/js";

export default {
  components: { LanguageInput },
  data() {
    return {
      mdiMenu,
      mdiHome,
      mdiMagnify,
      toggleMenu: true,
      toggleSearch: false,
      socials: [
        {
          link: `https://github.com/jainism-portal/jainaagam`,
          linkTitle: `Jain Aagam Github repository`,
          icon: mdiGithub,
          iconRole: `Github`,
          color: `gray`
        },
        {
          link: `https://instagram.com/ManasMadrecha`,
          linkTitle: `Manas Madrecha Instagram follow`,
          icon: mdiInstagram,
          iconRole: `Instagram`,
          color: `pink`
        },
        {
          link: `https://www.linkedin.com/in/manasmadrecha/`,
          linkTitle: `Manas Madrecha LinkedIn connect`,
          icon: mdiLinkedin,
          iconRole: `LinkedIn`,
          color: `blue`
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