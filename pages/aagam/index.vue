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
  methods: {
    addSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
    }
  },
  async fetch() {
    const ROUTE_PATH = this.$route.path.startsWith(`/aagam`)
      ? `/en${this.$route.path}`
      : this.$route.path;

    const ROUTE_PATH_WITH_SLASH = this.addSlash(ROUTE_PATH);

    this.posts = await this.$content(this.$i18n.locale, { deep: true })
      // .where({ type: "aagam_index" })
      .where({
        path: ROUTE_PATH_WITH_SLASH.slice(0, ROUTE_PATH_WITH_SLASH.length - 1)
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
    let website = `https://aagam.jainism.info`;

    let defaultAlt = this.$route.path.startsWith("/hi")
      ? `${website}${this.$route.path.slice(3)}`
      : `${website}${this.$route.path}`;
    return {
      title: this.post ? this.seoTitle : `Jain Aagam Sutra`,
      // titleTemplate: null,
      meta: [
        {
          hid: `description`,
          name: `description`,
          content: this.post ? this.seoDescription : `Jain Aagam Sutra`
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.post ? this.seoTitle : `Jain Aagam Sutra`
        },
        {
          hid: `og:description`,
          name: `og:description`,
          content: this.post ? this.seoDescription : `Jain Aagam Sutra`
        }
      ],
      link: [
        {
          rel: "alternate",
          href: this.addSlash(defaultAlt),
          hreflang: "en"
        },
        {
          rel: "alternate",
          href: this.addSlash(defaultAlt),
          hreflang: "x-default"
        },
        {
          rel: "alternate",
          href: this.addSlash(
            this.$route.path.startsWith("/hi")
              ? `${website}${this.$route.path}`
              : `${website}/hi${this.$route.path}`
          ),
          hreflang: "hi"
        },
        {
          rel: "canonical",
          href: this.addSlash(`${website}${this.$route.path}`),
          hreflang: this.$i18n.locale
        }
      ]
    };
  }
};
</script>

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>