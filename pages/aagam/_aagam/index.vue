<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <div v-if="content_aagam">
      <h1>
        Jain Aagam
        <span v-if="content_aagam.title">
          - {{ content_aagam.title }} सूत्र</span
        >
      </h1>
      <NuxtContent :document="content_aagam"></NuxtContent>
    </div>

    <div v-else>
      <p>This Aagam is yet to be added</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "aagamIndividual", // to avoid console error --> [Vue warn]: Invalid component name
  data() {
    return {
      content_aagam: null,
      routePath: "",
    };
  },
  async fetch() {
    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;

    this.content_aagam = await this.$content("hi/aagam", { deep: true })
      .where({
        $and: [
          { type: "aagam" },
          { path: { $contains: this.$route.params.aagam } },
        ],
      })
      .sortBy("slug")
      .fetch();

    this.content_aagam = this.content_aagam[0];
  },
};
</script>

<style lang="postcss" scoped>
</style>