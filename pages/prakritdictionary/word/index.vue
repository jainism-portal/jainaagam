<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <h1>Prakrit words</h1>
    <h2>List</h2>
    <ol>
      <li v-for="word in words" :key="word.slug">
        <nuxt-link :to="`/prakritdictionary/word/${word.slug}`">
          {{ word.slug }}
        </nuxt-link>
        -
        <span v-for="meaning in word.meanings" :key="meaning.meaning">
          {{ meaning.meaning }}<span v-if="word.meanings.length > 1">, </span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [],
    };
  },
  async fetch() {
    this.words = await this.$content("prakrit/words").sortBy("slug").fetch();
  },
};
</script>

<style lang="postcss" scoped>
</style>