<template>
  <div class="nuxt-content tw-mx-4 md:tw-mx-16">
    <center>
      <h1 class="tw-text-3xl">Jain Aagam</h1>
    </center>
    <div v-if="post">
      <NuxtContent :document="post"></NuxtContent>
    </div>
  </div>
</template>

<script>
export default {
  name: "AagamIndexPage",
  data() {
    return {
      posts: [],
      post: null
    };
  },
  async fetch() {
    this.posts = await this.$content(this.$i18n.locale, { deep: true })
      // .where({ type: "aagam_index" })
      .where({ path: this.$route.path })
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

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>