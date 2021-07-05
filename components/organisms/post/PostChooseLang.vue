<template>
  <ol class="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-4 tw-bg-gradient-to-br tw-from-white tw-to-gray-50 tw-p-4">
    <li
      v-for="langPost in langPosts"
      :key="langPost.path"
      class="choose-lang-li"
    >
      <nuxt-link
        exact
        :to="langPost.slug === 'en' ? `${langPost.dirWithoutAagam}` : `${langPost.pathWithoutAagam}`
          "
        class="tw-inline-block hover:tw-underline"
      >
        {{new Intl.DisplayNames(['en'], { type: `language` }).of(langPost.slug)}}
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: { langPosts: Array },
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
.choose-lang-li .nuxt-link-exact-active
  @apply tw-text-pink-500
</style>