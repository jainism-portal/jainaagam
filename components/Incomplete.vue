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
      This Book is yet to be added.
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
      This Part is yet to be added.
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
      This Chapter is yet to be added.
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
      This Lesson is yet to be added.
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
      This Sutra is yet to be added.
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