<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <div>
      <!-- v-if="content_everyAagamFile === null || content_sutra_original === null" -->
      <h1>This is yet to be added.</h1>
    </div>
    <!-- <div
      v-if="
        content_book === null &&
        content_part === null &&
        content_chapter === null &&
        content_lesson === null &&
        (content_sutra === undefined || content_sutra_original === undefined)
      "
    >
      <h1>This Sutra is yet to be added.</h1>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    content_everyAagamFile: null,
    content_sutra_original: undefined,
  },
};
</script>

<style lang="postcss" scoped>
</style>