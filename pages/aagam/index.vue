<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
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
    this.content_aagamindex = await this.$content(
      `${this.$i18n.locale}/aagam`,
      { deep: true }
    )
      .where({ type: "aagam_index" })
      .fetch();

    this.content_aagamindex = this.content_aagamindex[0];
  },
  // methods: {
  //   /**
  //    * Called when a language button is clicked
  //    * Changes the i18n context variable's locale to the one selected
  //    */
  //   changeLanguage(lang) {
  //     this.$i18n.locale = lang;
  //   },
  // },
};
</script>