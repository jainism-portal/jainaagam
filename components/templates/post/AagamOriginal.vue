<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching the Original Sutra... 💖 Wait for a few seconds 😊
    </div>
    <div v-else>
      <p><strong>{{posts.length}}</strong> Prakrit sutra added yet</p>
      <div
        :id="post.depth"
        v-for="post in posts"
        :key="post.depth"
        class="tw-group tw-px-2 tw-border-b tw-border-gray-300 tw-py-2 tw-bg-gradient-to-br tw-from-white tw-via-white"
        :class="(post.depth.match(/\./g) || []).length === 0 ? `tw-to-pink-50` : (post.depth.match(/\./g) || []).length === 1 ? `tw-to-blue-50` : (post.depth.match(/\./g) || []).length === 2 ? `tw-to-green-50` : (post.depth.match(/\./g) || []).length === 3 ? `tw-to-yellow-50` : (post.depth.match(/\./g) || []).length === 4 ? `tw-to-purple-50` : null"
      >
        <p
          class="tw-text-gray-500 tw-text-base tw-p-2 tw-max-w-max tw-inline-block tw-rounded tw-border group-hover:tw-font-semibold tw-transition-all"
          :class="(post.depth.match(/\./g) || []).length === 0 ? `tw-bg-pink-50  tw-border-pink-700` : (post.depth.match(/\./g) || []).length === 1 ? `tw-bg-blue-50 tw-border-blue-700` : (post.depth.match(/\./g) || []).length === 2 ? `tw-bg-green-50 tw-border-green-700` : (post.depth.match(/\./g) || []).length === 3 ? `tw-bg-yellow-50 tw-border-yellow-700` : (post.depth.match(/\./g) || []).length === 4 ? `tw-bg-purple-50 tw-border tw-border-purple-700` : null"
        >{{post.depth}}
        </p>
        <nuxt-link
          :to="post.dirWithoutAagam"
          class="tw-block md:tw-inline-block !tw-text-gray-400 tw-text-xs md:tw-text-base tw-transform-gpu md:tw-scale-0 md:group-hover:tw-scale-100 hover:tw-underline hover:!tw-text-gray-700 tw-transition-transform tw-duration-75 tw-mx-2"
        >{{post.dirWithoutAagam}}</nuxt-link>
        <div lang="pka-Deva">
          <p
            v-if="post.title"
            class="tw-font-semibold"
          >
            {{post.title}}
          </p>
          <nuxt-content :document="post"></nuxt-content>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import { flatten } from "flat";

import SutraMeaning from "~/components/atoms/sutra/SutraMeaning.vue";
import SutraExplanation from "~/components/atoms/sutra/SutraExplanation.vue";

export default {
  components: { SutraMeaning, SutraExplanation },
  data() {
    return {
      posts: [],
      query: ""
    };
  },
  computed: {
    routePathWithSlash() {
      if (this.$route) {
        return this.$route.path.endsWith(`/`)
          ? this.$route.path
          : `${this.$route.path}/`;
      }
    },
    AagamName() {
      let path = this.routePathWithSlash.slice(1); // remove the first slash
      return path.slice(0, path.indexOf("/"));
    }
  },
  async fetch() {
    this.posts = await this.$content(`aagam/${this.AagamName}`, {
      deep: true
    })
      .only([
        "dirWithoutAagam",
        "depth",
        "paddedDepth",
        "title",
        "slug",
        "show",
        "body"
      ])
      .where({
        $and: [
          // { type: `sutra` },
          // { "body.children": { $size: { $gt: 0 } } },
          { depth: { $len: { $gt: 0 } } },
          { slug: "original" },
          { show: { $ne: false } }
        ]
      })
      .sortBy("paddedDepth", "asc")
      .fetch();
    // this.posts = this.posts.map(post => {
    //   post.flat = flatten(post.body.children);
    //   return post;
    // });
    // this.postsFiltered = this.posts.filter(post => {
    //   return post.body.children.filter(child => child.tag === "sutra-meaning")
    //     .length > 0
    //     ? true
    //     : false;
    // });
    // this.postsFiltered = this.postsFiltered.map(post => {
    //   post.body.children = post.body.children.filter(
    //     child => child.tag === "sutra-meaning"
    //   );
    //   return post;
    // });

    // https://stackoverflow.com/questions/50566693/intl-collator-for-js-objects
    // let collator = new Intl.Collator(undefined, {
    //   numeric: true,
    //   sensitivity: "base"
    // });
    // this.posts = this.posts.sort((a, b) => {
    //   return collator.compare(a.depth, b.depth);
    // });
  }
};
</script>

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>
