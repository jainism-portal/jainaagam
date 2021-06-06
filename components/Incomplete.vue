<template>
  <div class="tw-mx-4">
    <!-- v-if="content_everyAagamFile === null || content_sutra_original === null" -->
    <header class="tw-text-center">
      <h1 class="tw-text-3xl tw-font-medium tw-text-pink-800">Work in Progress
      </h1>
      <p class="tw-text-gray-500">This page is yet to be added.</p>
    </header>
    <div class="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-4">
      <div class="list-item">
        This page is not yet available in {{$i18n.localeProperties.name}} language.
        <div>
          Choose different language from Sidebar.
        </div>
      </div>
      OR
      <div class="list-item">Go <nuxt-link
          :to="localePath(`/`)"
          class="!tw-text-blue-700"
        >Home</nuxt-link> to navigate to the Aagam of your choice.
      </div>
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
    content_sutra_original: undefined
  }
};
</script>

<style lang="sass" scoped>
.list-item
  @apply tw-inline-block tw-p-6 tw-border tw-border-gray-400 hover:tw-shadow-xl tw-text-center tw-text-gray-600
</style>