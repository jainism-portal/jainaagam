<template>
  <div class="tw-mt-3 nuxt-content tw-mx-4 md:tw-mx-16">
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
      .where({
        path: this.$route.path.startsWith(`/aagam`)
          ? `/en${this.$route.path}`
          : this.$route.path
      })
      .fetch();

    this.post = this.posts[0];
  },
  computed: {
    seoTitle() {
      if (this.post && this.post.seo) {
        return this.post.seo.title;
      } else return this.post.title;
    },
    seoDescription() {
      if (this.post && this.post.seo) {
        return this.post.seo.description;
      } else return this.post.description;
    }
  },
  head() {
    if (this.post) {
      return {
        title: this.seoTitle,
        // titleTemplate: null,
        meta: [
          {
            hid: `description`,
            name: `description`,
            content: this.seoDescription
          },
          {
            hid: "og:title",
            property: "og:title",
            content: this.seoTitle
          },
          {
            hid: `og:description`,
            name: `og:description`,
            content: this.seoDescription
          }
        ]
      };
    }
  }
};
</script>

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>