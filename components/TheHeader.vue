<template>
  <header class="tw-sticky tw-z-30 tw-top-0 tw-flex tw-justify-evenly tw-items-center tw-bg-gradient-to-br tw-from-white tw-to-pink-50">
    <div>
      <nuxt-link
        :to="`/${$i18n.locale}`"
        class="tw-text-2xl tw-text-pink-800"
      >
        Jainism
      </nuxt-link>
    </div>
    <nav>
      <ul class="tw-flex tw-justify-evenly tw-list-none tw-py-0">
        <li class="tw-mr-4">
          <nuxt-link :to="`/${$i18n.locale}/aagam`">
            {{ $t("aagam") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/prakritdictionary/word">
            Prakrit Dictionary
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div>
      <LanguageInput></LanguageInput>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
</style>