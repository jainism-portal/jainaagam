<template>
  <!-- v-if="content_everyAagamFile === null || content_sutra_original === null" -->
  <div class="tw-mt-3 tw-text-gray-600 tw-text-center">
    <p class="">This page is yet to be added in {{$i18n.localeProperties.name}} language. </p>
    <LanguageInput class="tw-mb-3 tw-p-2 tw-inline-block tw-bg-pink-50 tw-border  tw-border-pink-300 tw-transform-gpu tw-transition-transform hover:tw-scale-110"></LanguageInput>
    <p>Or go Home <nuxt-link
        :to="localePath(`/`)"
        class="!tw-text-blue-700 hover:tw-underline"
      >to read Jain Aagam</nuxt-link> of your choice.
    </p>
    <!-- <div v-if="content_book === null && content_part === null && content_chapter === null &&content_lesson === null && (content_sutra === undefined || content_sutra_original === undefined)"></div> -->
  </div>
</template>

<script>
import LanguageInput from "~/components/molecules/LanguageInput.vue";

export default {
  components: { LanguageInput },
  props: {
    content_everyAagamFile: null,
    content_sutra_original: undefined
  }
};
</script>

<style lang="sass" scoped>
</style>