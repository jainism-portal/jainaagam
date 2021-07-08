<template>
  <ol class="tw-my-0 !tw-pl-0 tw-py-2 tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-2 md:tw-gap-4 tw-border-t">
    <li
      v-for="langPost in langPosts"
      :key="langPost.path"
      class="choose-lang-li"
    >
      <nuxt-link
        exact
        :to="langPost.slug === 'en' ? `${langPost.dirWithoutAagam}` : `${langPost.pathWithoutAagam}`
          "
        hreflang="langPost.slug"
        class="tw-border-gray-200 hover:tw-border-linkpink"
      >
        {{IntlName(langPost.slug)}}
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: { langPosts: Array },
  methods: {
    IntlName(lang) {
      let name = new Intl.DisplayNames(["en"], { type: `language` }).of(lang);
      return name;
    }
  }
};
</script>

<style lang="sass" scoped>
.choose-lang-li .nuxt-link-exact-active
  @apply tw-text-green-500 tw-border-none
  &::before
    content: "✔ "
</style>