<template>
  <div class="nuxt-content">
    <h1 class="tw-text-3xl">Jain Aagam</h1>
    <NuxtContent :document="post"></NuxtContent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      post: null
    };
  },
  async fetch() {
    this.posts = await this.$content(`${this.$i18n.locale}`)
      .where({ type: "aagam_index" })
      .fetch();

    this.post = this.posts[0];
  }
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