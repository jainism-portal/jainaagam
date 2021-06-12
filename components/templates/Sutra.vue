<template>
  <v-tabs
    show-arrows
    :slider-size="1"
    v-if="sutraOriginal"
  >
    <v-tab
      data-tab
      active-class="tw-bg-gradient-to-t tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
    >
      <!-- <span>{{$t("pages.sutra.main.sutra.tabs.name")}}</span> -->
      <span class="tw-capitalize">{{$t("pages.sutra.main.sutra.tabs.original")}}</span>
    </v-tab>
    <v-tabs-slider class="tw-bg-gradient-to-br tw-from-white tw-to-yellow-400"></v-tabs-slider>
    <v-tab-item
      lang="pka-Deva"
      class="tw-mt-3 tw-text-gray-600"
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
      <!-- <span>{{$t("pages.sutra.main.sutra.tabs.name")}}</span> -->
      <span class="tw-capitalize">{{$t("pages.sutra.main.sutra.tabs.transliteration")}}</span>
    </v-tab>
    <v-tab-item
      lang="pkr-Latn"
      class="tw-mt-6 tw-text-gray-600"
      eager
    >
      <nuxt-content
        :document="sutraLatn"
        class="tw-border tw-px-2 md:tw-px-4"
      ></nuxt-content>
    </v-tab-item>
  </v-tabs>
</template>

<script>
const flatten = require("flat");
const unflatten = require("flat").unflatten;

export default {
  props: { sutraOriginal: Object },
  data() {
    return {
      sutra: this.sutraOriginal,
      sutraLatn: null
    };
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