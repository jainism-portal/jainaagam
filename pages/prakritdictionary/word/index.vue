<template>
  <div>
    <h1>Prakrit words</h1>
    <h2>List</h2>
    <div v-for="word in words" :key="word.slug">
      <nuxt-link :to="`/prakritdictionary/word/${word.slug}`">
        {{ word.slug }}
      </nuxt-link>
    </div>
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