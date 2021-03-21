<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-green tw-max-w-none">
    <h1>Jain Aagam</h1>
    <NuxtContent :document="content_aagamindex"></NuxtContent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content_aagamindex: null,
    };
  },
  async fetch() {
    this.content_aagamindex = await this.$content("hi", { deep: true })
      .where({ type: "aagam_index" })
      .fetch();

    this.content_aagamindex = this.content_aagamindex[0];
  },
};
</script>