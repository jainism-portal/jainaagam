<template>
  <div>
    <div v-for="aagam in aagams.aagams" :key="aagam.title">
      <nuxt-link :to="`/aagam/${aagam.title}`">
        {{ aagam.title }}
      </nuxt-link>
    </div>
    <pre>

    {{ aagams }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aagams: [],
    };
  },
  async fetch() {
    this.aagams = await this.$content("aagam-meta", "all").fetch();
  },
};
</script>

<style lang="postcss" scoped>
</style>