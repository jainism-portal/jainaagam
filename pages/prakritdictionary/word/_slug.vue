<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <nuxt-link to="/prakritdictionary/word">Go back to All words</nuxt-link>
    <h1>
      {{ word.slug }}
    </h1>
    <h2>Meaning</h2>
    <div v-for="mean in word.meanings" :key="mean.meaning">
      {{ mean.meaning }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      word: [],
    };
  },
  async fetch() {
    this.word = await this.$content("prakrit/words")
      .where({ slug: this.$route.params.slug })
      .fetch();
    this.word = this.word[0];
  },
};
</script>

<style lang="postcss" scoped>
</style>