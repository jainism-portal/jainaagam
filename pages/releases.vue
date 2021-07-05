<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching... 💖 Wait for a few seconds 😊
    </div>
    <article
      v-else
      class="tw-mx-4"
    >
      <h1 class="tw-my-3 md:tw-my-6 tw-text-5xl tw-text-pink-800 tw-text-center">Releases</h1>
      <div class=" tw-text-center tw-text-gray-500 tw-text-base">
        <p class="tw-my-3">A list of changes mades on website and to know what's new.</p>
        <p class="tw-my-3">Please note that this list is not up-to-date. To view all the changes, just visit our Jain Aagam repository on Github.</p>
      </div>
      <div v-if="post">
        <section
          v-for="release in post.$releases"
          :key="release.url"
          class="tw-border tw-px-4 tw-py-2 tw-m-6"
        >
          <div class="tw-my-3 md:tw-my-6 tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-border-b tw-pb-2">
            <h2 class="tw-text-3xl tw-font-semibold">{{release.tagName}}</h2>
            <time :datetime="release.createdAt">{{formatDate(release.createdAt)}}</time>
          </div>
          <nuxt-content :document="release.body"></nuxt-content>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
export default {
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

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>