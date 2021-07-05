<template>
  <section v-if="children && children.length">
    <header
      @click="toggleContents = !toggleContents"
      class="tw-group tw-cursor-pointer tw-my-3 md:tw-my-6 tw-text-pink-800 tw-text-xl md:tw-text-3xl tw-bg-gradient-to-r tw-from-white tw-to-red-50 tw-rounded-md tw-py-1 tw-flex tw-flex-wrap tw-justify-between tw-items-center"
    >
      <h2>Jain Aagam contents</h2>
      <v-icon class="tw-mx-4 !tw-text-pink-800">{{!toggleContents ? mdiChevronDown : mdiChevronUp}}</v-icon>
    </header>
    <ol
      class="!tw-pl-0"
      :class="toggleContents ? `tw-flex tw-flex-wrap tw-gap-4 tw-justify-start tw-items-end` : `tw-hidden`"
    >
      <li
        v-for="child in children"
        :key="child.paddedDepth"
      >
        <nuxt-link
          :to="child.dirWithoutAagam"
          class="custom-first-letter-capitalize tw-inline-block tw-m-1 tw-p-1.5 !tw-text-linkblue tw-border tw-border-gray-200 tw-rounded hover:tw-bg-blue-50"
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

