<template>
  <section>
    <header
      @click="toggleOriginal = !toggleOriginal"
      class="tw-group tw-cursor-pointer tw-my-3 md:tw-my-6 tw-text-pink-800 tw-text-xl md:tw-text-3xl tw-bg-gradient-to-r tw-from-white tw-to-red-50 tw-rounded-md tw-py-1 tw-flex tw-flex-wrap tw-justify-between tw-items-center"
    >
      <h2>Jain Aagam Sutra</h2>
      <v-icon class="tw-mx-4 !tw-text-pink-800">{{!toggleOriginal ? mdiChevronDown : mdiChevronUp}}</v-icon>
    </header>
    <v-tabs
      show-arrows
      :slider-size="1"
      v-show="toggleOriginal"
    >
      <v-tab
        data-tab
        active-class="tw-bg-gradient-to-t tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
      >
        <span class="tw-capitalize">Original</span>
      </v-tab>
      <v-tabs-slider class="tw-bg-gradient-to-br tw-from-white tw-to-yellow-400"></v-tabs-slider>
      <v-tab-item
        lang="pka-Deva"
        class="tw-mt-3 tw-text-gray-600 tw-overflow-y-auto tw-max-h-[40vh]"
        eager
      >
        <nuxt-content
          :document="sutraOriginal"
          class="tw-border tw-px-2 md:tw-px-4"
        ></nuxt-content>
      </v-tab-item>
      <v-tab
        data-tab
        active-class="tw-bg-gradient-to-t tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
      >
        <span class="tw-capitalize">Transliteration</span>
      </v-tab>
      <v-tab-item
        lang="pkr-Latn"
        class="tw-mt-6 tw-text-gray-600 tw-overflow-y-auto tw-max-h-[40vh]"
        eager
      >
        <nuxt-content
          :document="sutraLatn"
          class="tw-border tw-px-2 md:tw-px-4"
        ></nuxt-content>
      </v-tab-item>
    </v-tabs>
    <nuxt-link
      :to="`/${AagamName}/original#${sutraOriginal.depth}`"
      class="tw-text-base tw-underline !tw-text-gray-500 "
    >Read full {{AagamName}} original sutra</nuxt-link>
  </section>

</template>

<script>
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

const flatten = require("flat");
const unflatten = require("flat").unflatten;

export default {
  props: { sutraOriginal: Object },
  data() {
    return {
      mdiChevronDown,
      mdiChevronUp,
      toggleOriginal: true,
      sutra: this.sutraOriginal,
      sutraLatn: {}
    };
  },
  computed: {
    routePathWithSlash() {
      if (this.$route) {
        return this.$route.path.endsWith(`/`)
          ? this.$route.path
          : `${this.$route.path}/`;
      }
    },
    AagamName() {
      let path = this.routePathWithSlash.slice(1); // remove the first slash
      return path.slice(0, path.indexOf("/"));
    }
  },
  async fetch() {
    const sans = require("@sanskrit-coders/sanscript");

    let a = flatten(this.sutra);

    let b = Object.entries(a).map(child => {
      if (child[0].endsWith("value")) {
        child[1] = sans.t(child[1], "devanagari", "iast");
      } else child[1] = child[1];
      return [child[0], child[1]];
    });

    let c = Object.fromEntries(b);

    this.sutraLatn = unflatten(c);
  }
};
</script>

<style lang="sass" scoped>
.v-slide-group__next, .v-slide-group__prev
  flex: 0 1 32px !important
// [data-tab]
//   @apply tw-text-sm md:tw-text-base
</style>

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>