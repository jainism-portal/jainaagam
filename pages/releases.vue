<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching... 💖 Wait for a few seconds 😊
    </div>
    <article v-else>
      <Breadcrumbs
        v-if="$route.path"
        :path="$route.path.endsWith(`/`) ? $route.path : `${$route.path}/`"
      >
      </Breadcrumbs>
      <h1 class="nuxt-content-h1">Releases</h1>
      <div class="tw-container tw-mx-auto tw-px-4">

        <div class="tw-text-center tw-text-gray-700 tw-text-base">
          <p>A list of changes mades on website and to know what's new.</p>
          <p>Please note that this list is not up-to-date. To view all the changes, just visit our Jain Aagam repository on Github.</p>
        </div>
        <div v-if="post">
          <section
            v-for="release in post.$releases"
            :key="release.url"
            class="tw-border tw-px-4 tw-py-2 tw-my-3 md:tw-my-6"
          >
            <div class="tw-my-3 md:tw-my-6 tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-border-b tw-pb-2">
              <h2 class="nuxt-content-h2 tw-border-none tw-my-0">{{release.tagName}}</h2>
              <time :datetime="release.createdAt">{{formatDate(release.createdAt)}}</time>
            </div>
            <nuxt-content :document="release.body"></nuxt-content>
          </section>
        </div>
      </div>

    </article>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/organisms/post/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  data() {
    return {
      releases: [],
      post: {}
    };
  },
  async fetch() {
    this.post = await this.$content("releases").fetch();
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    }
  },
  head() {
    return {
      title: `Jain Aagam releases`
    };
  }
};
</script>

<style lang="sass" scoped>
// To override vuetify para
p
  @apply tw-my-3 md:tw-my-6
</style>