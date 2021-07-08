<template>
  <section>
    <h2 class="nuxt-content-h2">Aagam Sutra</h2>
    <div class="tw-my-3 md:tw-my-6 tw-flex tw-flex-col md:tw-flex-row tw-flex-wrap tw-justify-around tw-items-stretch tw-gap-2">
      <div class="md:tw-w-[calc(50%-0.5rem)]">
        <details class="tw-w-full tw-my-0">
          <summary>
            <h3 class="tw-my-0 tw-inline">Original</h3>
          </summary>
          <nuxt-content
            :document="sutraOriginal"
            lang="pka-Deva"
          ></nuxt-content>
        </details>
      </div>
      <div class="md:tw-w-[calc(50%-0.5rem)]">
        <details class="tw-w-full tw-my-0">
          <summary>
            <h3 class="tw-my-0 tw-inline">
              Transliteration
            </h3>
          </summary>
          <nuxt-content
            :document="sutraLatn"
            lang="pka-Latn"
          ></nuxt-content>
        </details>
      </div>
    </div>
    <nuxt-link
      :to="`/${AagamName}/original#${sutraOriginal.depth}`"
      class="tw-inline tw-text-base tw-border-gray-300"
    >Read full {{AagamName}} original sutra here</nuxt-link>
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