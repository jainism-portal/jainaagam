<template>
  <div>
    <div
      v-if="
        content_book === undefined &&
        content_part === null &&
        content_chapter === null &&
        content_lesson === null &&
        (content_sutra === null || content_sutra_original === null)
      "
    >
      <h1>This Book is yet to be added.</h1>
    </div>
    <div
      v-if="
        content_book === null &&
        content_part === undefined &&
        content_chapter === null &&
        content_lesson === null &&
        (content_sutra === null || content_sutra_original === null)
      "
    >
      <h1>This Part is yet to be added.</h1>
    </div>
    <div
      v-if="
        content_book === null &&
        content_part === null &&
        content_chapter === undefined &&
        content_lesson === null &&
        (content_sutra === null || content_sutra_original === null)
      "
    >
      <h1>This Chapter is yet to be added.</h1>
    </div>
    <div
      v-if="
        content_book === null &&
        content_part === null &&
        content_chapter === null &&
        content_lesson === undefined &&
        (content_sutra === null || content_sutra_original === null)
      "
    >
      <h1>This Lesson is yet to be added.</h1>
    </div>
    <div
      v-if="
        content_book === null &&
        content_part === null &&
        content_chapter === null &&
        content_lesson === null &&
        (content_sutra === undefined || content_sutra_original === undefined)
      "
    >
      <h1>This Sutra is yet to be added.</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content_book: null,
    content_part: null,
    content_chapter: null,
    content_lesson: null,
    content_sutra: undefined,
    content_sutra_original: undefined,
  },
};
</script>

<style lang="postcss" scoped>
</style>