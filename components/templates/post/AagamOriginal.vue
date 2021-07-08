<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching the Original Sutra... 💖 Wait for a few seconds 😊
    </div>
    <div v-else>
      <h2 class="nuxt-content-h2">Original Aagam in Prakrit</h2>
      <p><strong>{{posts.length}}</strong> Prakrit sutra added yet 🙏🏻</p>
      <p>I will keep adding more sutra as and when time permits. 😊</p>
      <details>
        <summary>How to hide the links?</summary>
        <p class="tw-text-sm md:tw-text-base">I have added the link for each sutra for you to easily navigate to its respective page to quickly read the meaning, explanation, transliteration etc. of that particular sutra. Moreover, so as not to distract you while reading the Aagam, I have purposefully set a very light color for them.
        </p>
        <p class="tw-text-sm md:tw-text-base">But if you find even that distracting or if you want to simply copy a group of sutras without copying the links thereof, you can hide all the links by clicking on this button.
        </p>
        <button
          v-ripple
          @click="
          showLinks=!showLinks"
        >{{showLinks ? `Hide` : `Show`}} links</button>
      </details>
      <div class="tw-my-3 md:tw-my-6 tw-border-t tw-border-pink-400 tw-pt-3 ">
        <div
          :id="post.depth"
          v-for="post in posts"
          :key="post.depth"
          class="tw-group tw-border-b tw-border-gray-300 tw-py-2 md:tw-px-4 tw-bg-gradient-to-br tw-from-white tw-via-white"
          :class="(post.depth.match(/\./g) || []).length === 0 ? `tw-to-pink-50` : (post.depth.match(/\./g) || []).length === 1 ? `tw-to-blue-50` : (post.depth.match(/\./g) || []).length === 2 ? `tw-to-green-50` : (post.depth.match(/\./g) || []).length === 3 ? `tw-to-yellow-50` : (post.depth.match(/\./g) || []).length === 4 ? `tw-to-purple-50` : null"
        >
          <div class="tw-flex tw-justify-start tw-items-center md:tw-items-baseline tw-gap-2 md:tw-gap-4">
            <div
              class="tw-w-2/12 tw-flex-shrink-0 tw-text-gray-500 tw-text-xs md:tw-text-base tw-px-2 tw-py-1 tw-max-w-max tw-rounded tw-border tw-transition-all"
              :class="(post.depth.match(/\./g) || []).length === 0 ? `tw-bg-pink-50  tw-border-pink-700` : (post.depth.match(/\./g) || []).length === 1 ? `tw-bg-blue-50 tw-border-blue-700` : (post.depth.match(/\./g) || []).length === 2 ? `tw-bg-green-50 tw-border-green-700` : (post.depth.match(/\./g) || []).length === 3 ? `tw-bg-yellow-50 tw-border-yellow-700` : (post.depth.match(/\./g) || []).length === 4 ? `tw-bg-purple-50 tw-border tw-border-purple-700` : null"
            >
              {{post.depth}}
            </div>
            <div
              class="tw-w-10/12 tw-leading-none"
              v-show="showLinks"
            >
              <nuxt-link
                :to="post.dirWithoutAagam"
                class="tw-border-gray-100 tw-text-gray-300 tw-text-xs md:tw-text-base group-hover:tw-text-gray-600 group-hover:tw-border-gray-600 focus:tw-text-gray-600 focus:tw-border-gray-600"
              >{{post.dirWithoutAagam}}</nuxt-link>
            </div>
          </div>
          <div lang="pka-Deva">
            <p
              v-if="post.title"
              class="tw-font-medium tw-text-center tw-text-2xl"
            >
              {{post.title}}
            </p>
            <nuxt-content :document="post"></nuxt-content>
          </div>
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
      query: "",
      showLinks: true
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
