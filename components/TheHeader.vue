<template>
  <div>
    <v-navigation-drawer
      app
      v-model="toggleMenu"
      class="!tw-z-50"
      clipped
    >
      <div class="tw-h-full tw-flex tw-flex-col md:tw-flex-none">
        <div class="md:tw-hidden tw-h-[10%] tw-mt-3 tw-pb-2 tw-border-b tw-border-gray-300 tw-flex tw-justify-center tw-items-center">
          <nuxt-link
            :to="localePath('/')"
            class="tw-inline-block tw-text-xl !tw-text-pink-600"
          >
            ꣽ {{$t("basic.jain_aagam")}}
          </nuxt-link>
        </div>

        <div class="tw-h-[70%] md:tw-h-full tw-p-3 tw-text-gray-600 tw-overflow-y-auto">
          <language-input></language-input>
        </div>

        <footer class="tw-h-auto tw-p-2 tw-border-t tw-border-gray-300">
          <a
            href="https://github.com/jainism-portal/jainaagam"
            target="_blank"
            rel="noopener noreferrer"
            title="Jain Aagam Github repository"
            class="tw-inline-block tw-p-1"
          >
            <v-icon class="!tw-text-gray-600">mdi mdi-star</v-icon> <span class="tw-text-linkblue hover:tw-underline"> Star us on Github</span>
            <v-icon small>mdi mdi-open-in-new</v-icon>
          </a>
          <p class="tw-p-1">&copy; {{ $t("author.default") }}</p>
          <div class="tw-flex tw-flex-wrap">
            <a
              v-for="social in socials"
              :key="social.link"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="tw-inline-block tw-p-1 tw-rounded-xl hover:tw-shadow"
              :class="`hover:tw-bg-${social.color}-50`"
              :title="social.linkTitle"
            >
              <v-icon
                :role="social.iconRole"
                :class="`!tw-text-${social.color}-600`"
              >mdi {{social.icon}}</v-icon>
            </a>
          </div>
        </footer>

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
        role="menu"
        @click.stop="toggleMenu = !toggleMenu"
        class="!tw-text-gray-500 tw-mx-2 tw-transform hover:tw-scale-125 tw-transition-transform"
      >mdi mdi-menu</v-icon>

      <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
        <nuxt-link
          :to="localePath('/')"
          class="tw-inline-block tw-mx-2 tw-p-2 !tw-text-pink-700 tw-font-semibold tw-text-xl md:tw-text-2xl tw-transform hover:tw--skew-x-6 tw-transition-transform"
        >{{$t("basic.jain_aagam")}}</nuxt-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import LanguageInput from "~/components/LanguageInput";

export default {
  components: { LanguageInput },
  data() {
    return {
      toggleMenu: this.$vuetify.breakpoint.mdAndUp,
      toggleSearch: false,
      socials: [
        {
          link: `https://github.com/ManasMadrecha`,
          linkTitle: `Manas Madrecha Github`,
          icon: `mdi-github`,
          iconRole: `Github`,
          color: `gray`
        },
        {
          link: `https://instagram.com/ManasMadrecha`,
          linkTitle: `Manas Madrecha Instagram follow`,
          icon: `mdi-instagram`,
          iconRole: `Instagram`,
          color: `pink`
        },
        {
          link: `https://www.linkedin.com/in/manasmadrecha/`,
          linkTitle: `Manas Madrecha LinkedIn connect`,
          icon: `mdi-linkedin`,
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