<template>
  <div
    class=""
    v-if="post"
  >
    <Breadcrumbs
      v-if="$route.path"
      :path="$route.path.endsWith(`/`) ? $route.path : `${$route.path}/`"
    >
    </Breadcrumbs>
    <header class="tw-text-center">
      <h1 class="tw-px-2 md:tw-px-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-r tw-from-white tw-to-blue-50 tw-p-2">{{post.title}}</h1>
    </header>
    <main
      v-if="post"
      class="tw-my-4 tw-mx-4"
    >
      <NuxtContent :document="post"></NuxtContent>
    </main>
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