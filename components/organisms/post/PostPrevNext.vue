<template>
  <div
    class="tw-my-6 tw-flex tw-flex-col md:tw-flex-row tw-justify-around tw-items-center tw-border-t tw-border-b tw-py-4"
    v-if="prev || next"
  >
    <nuxt-link
      v-if="prev && Object.keys(prev).length"
      :to="prev.dirWithoutAagam"
      class="tw-inline-block tw-mx-2 tw-text-center tw-capitalize !tw-text-linkblue  hover:tw-underline"
    >Prev 👈🏻 {{prev.slugurl}}</nuxt-link>
    <nuxt-link
      v-if="next && Object.keys(next).length"
      :to="next.dirWithoutAagam"
      class="tw-inline-block tw-mx-2 tw-text-center tw-capitalize !tw-text-linkblue  hover:tw-underline"
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
    // SIBLINGS ( PREV-NEXT )
    if (this.filePathWithoutLocale && this.AagamName) {
      [this.prev, this.next] = await this.$content(`aagam/${this.AagamName}`, {
        deep: true
      })
        .without(["body", "toc"])
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

<style lang="scss" scoped>
</style>