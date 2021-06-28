<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row">
    <nuxt-link
      :to="prevs.path"
      v-if="this.prevs"
      class="tw-mx-2"
    >{{prevs.path}}</nuxt-link>
    <nuxt-link
      :to="nexts.path"
      v-if="this.nexts"
      class="tw-mx-2"
    >{{nexts.path}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: { post: { type: Object }, pathMatch: String },
  data() {
    return {
      prevs: null,
      nexts: null
    };
  },
  async fetch() {
    [this.prevs, this.nexts] = await this.$content({ deep: true })
      .without(["body", "toc"])
      .where({ dir: this.post.dir })
      // .where({ index: !true })
      .sortBy("position", "asc")
      .sortBy("slug", "asc")
      .surround(this.post.path)
      .fetch();
  }
};
</script>

<style lang="sass" scoped>
</style>