<template>
  <section v-if="children && children.length">
    <header
      @click="toggleContents = !toggleContents"
      class="tw-my-3 md:tw-my-6 tw-py-2 tw-border-b tw-border-gray-300 tw-cursor-pointer tw-flex tw-flex-wrap tw-justify-between tw-items-center"
    >
      <h2 class="nuxt-content-h2 tw-border-none tw-my-0">Contents</h2>
      <v-icon class="tw-mx-4 !tw-text-pink-800">{{!toggleContents ? mdiChevronDown : mdiChevronUp}}</v-icon>
    </header>
    <ol
      class="!tw-pl-0"
      :class="toggleContents ? `tw-flex tw-flex-wrap tw-justify-start tw-items-end tw-gap-2 md:tw-gap-4` : `tw-hidden`"
    >
      <li
        v-for="child in children"
        :key="child.paddedDepth"
      >
        <nuxt-link
          :to="child.dirWithoutAagam"
          class="tw-inline md:tw-inline-block first-letter:tw-uppercase tw-p-1.5 md:tw-border tw-border-gray-200 tw-rounded hover:tw-border-pink-200 md:hover:tw-bg-gradient-to-br md:hover:tw-from-white md:hover:tw-to-pink-50"
        >
          {{child.title ? `${child.slugurl.replace(/-/g, " ").replace(/^toc$/, 'Table of Contents')} → ${child.title}` : child.slugurl.replace(/-/g, " ").replace(/^toc$/, 'Table of Contents')}}
        </nuxt-link>
      </li>
    </ol>
  </section>
</template>

<script>
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
export default {
  props: {
    AagamName: String,
    metaPost: Object
  },
  data() {
    return {
      mdiChevronDown,
      mdiChevronUp,
      children: [],
      toggleContents: true
    };
  },
  async fetch() {
    // CHILDREN
    if (this.metaPost) {
      this.children = await this.$content(`aagam/${this.AagamName}`, {
        deep: true
      })
        .only(["paddedDepth", "dirWithoutAagam", "title", "slugurl"])
        .where({
          $and: [
            {
              // path: {
              //   $regex:
              //     `${this.metaPost.dir}/` + "\\w+" + "-" + "\\d+" + `/meta`
              // }
              path: {
                $regex:
                  `${this.metaPost.dir}/` +
                  "(" +
                  "\\w+" +
                  "-" +
                  "\\d+" +
                  "|" +
                  "toc" +
                  "|" +
                  "original" +
                  ")" +
                  `/meta`
              }
            },

            // { dir: { $regex: "^" + this.metaPost.dir } },
            // { "parent.type": this.metaPost.type },
            // { slug: "meta" },
            { show: { $ne: false } }
          ]
        })
        .sortBy("paddedDepth", "asc")
        .fetch();
    }
  }
};
</script>