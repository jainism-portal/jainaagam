<template>
  <div
    class="tw-my-3 md:tw-my-6 tw-flex tw-flex-wrap tw-justify-around tw-items-center tw-border-t tw-border-b tw-py-4 tw-gap-2 md:tw-gap-4"
    v-if="prev || next"
  >
    <nuxt-link
      v-if="prev && Object.keys(prev).length"
      :to="prev.dirWithoutAagam"
      class="tw-border-gray-200 hover:tw-border-linkpink tw-text-center tw-capitalize"
    >Prev 👈🏻 {{prev.slugurl}}</nuxt-link>
    <nuxt-link
      v-if="next && Object.keys(next).length"
      :to="next.dirWithoutAagam"
      class="tw-border-gray-200 hover:tw-border-linkpink tw-text-center tw-capitalize"
    >Next 👉🏻 {{next.slugurl}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: { filePathWithoutLocale: String, AagamName: String },
  data() {
    return {
      prev: {},
      next: {}
    };
  },
  async fetch() {
    if (this.filePathWithoutLocale && this.AagamName) {
      [this.prev, this.next] = await this.$content(`aagam/${this.AagamName}`, {
        deep: true
      })
        .only(["dirWithoutAagam", "slug", "show", "slugurl"])
        .where({
          $and: [{ slug: `meta` }, { show: { $ne: false } }]
        })
        .sortBy("paddedDepth", "asc")
        .surround(`/aagam${this.filePathWithoutLocale}/meta`)
        .fetch();
    }
  }
};
</script>
