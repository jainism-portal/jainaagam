<template>
  <div v-if="posts">
    <p><strong>{{posts.length}}</strong> Prakrit sutra added yet</p>
    <div
      v-for="(post, i) in posts"
      :key="i"
      class="tw-px-2 tw-border-b tw-border-gray-300 tw-pt-4"
    >
      <div class="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-py-2">
        <span class="tw-text-gray-500 tw-text-base">{{post.joinedPositions}}
        </span>
        <!-- TODO: add links to meanings -->
        <!-- <div class="tw-flex tw-flex-wrap tw-text-sm tw-text-gray-500 tw-underline tw-justify-center tw-items-center">
          English
          Hindi
        </div> -->
      </div>
      <nuxt-content :document="post"></nuxt-content>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  computed: {
    AagamName() {
      if (this.$route?.params?.pathMatch) {
        // Add a Trailing Slash because, for e.g., on http://localhost:3000/en/aagam/acharanga/ page, the pathMatch is "acharanga" (not "acharanga/")
        const pathMatch = this.$route.params.pathMatch.endsWith("/")
          ? this.$route.params.pathMatch
          : `${this.$route.params.pathMatch}/`;
        const indexOfFirstSlash = pathMatch.indexOf(`/`);
        // Return only the "acharanga" part of the string.
        return pathMatch.slice(0, indexOfFirstSlash);
      }
    }
  },
  async fetch() {
    this.posts = await this.$content(`original/${this.AagamName}`, {
      deep: true
    })
      .without(["dir", "readingTime"])
      .where({
        $and: [
          { show: { $ne: false } },
          { type: `sutra` },
          { "body.children": { $size: { $gt: 0 } } }
        ]
      })
      .fetch();

    this.posts.map(post => {
      let pathWithSlash = post.path.endsWith(`/`) ? post.path : `${post.path}/`;
      let positions = pathWithSlash.match(/\d+(?=\/)/g);
      let joinedPositions = positions.join(`.`);
      post.joinedPositions = joinedPositions;
      return post;
    });

    // https://stackoverflow.com/questions/50566693/intl-collator-for-js-objects
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base"
    });

    this.posts = this.posts.sort((a, b) => {
      return collator.compare(a.joinedPositions, b.joinedPositions);
    });
  }
};
</script>
