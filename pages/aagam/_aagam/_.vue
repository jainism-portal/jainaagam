<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <div v-if="$fetchState.pending">Fetching content... Wait a few seconds</div>
    <div v-else-if="$fetchState.error">
      <!-- (content_book === null &&
          content_section === null &&
          content_part === null &&
          content_chapter === null &&
          content_lesson === null &&
          content_sutra === null) || -->
      Wrong URL. Check URL again or go Home.
    </div>
    <div v-else class="tw-mx-2 sm:tw-mx-0">
      <!-- <Incomplete
        v-if="
          !(
            content_book ||
            content_part ||
            content_chapter ||
            content_lesson ||
            content_sutra ||
            content_sutra_original
          )
        "
        :content_book="content_book"
        :content_part="content_part"
        :content_chapter="content_chapter"
        :content_lesson="content_lesson"
        :content_sutra="content_sutra"
        :content_sutra_original="content_sutra_original"
      ></Incomplete> -->

      <article class="">
        <div
          v-if="content_everyAagamFile && content_everyAagamFile.order"
          class="tw-bg-white tw-sticky tw-top-14 tw-z-20 tw-border-b tw-border-gray-300 tw-text-center tw-pb-1 tw-mt-2 tw-mb-2 md:tw-mt-0 md:tw-mb-4"
        >
          <p
            v-for="(items, i) in Object.entries(content_everyAagamFile.order)"
            :key="i"
            class="tw-inline"
          >
            <span v-for="(item, i2) in items" :key="i2">
              <span v-if="typeof item === 'string' && item != 'cat'"
                >{{ item }}-</span
              ><span v-if="typeof item === 'object'"
                >{{ item.position }} →
              </span>
            </span>
          </p>
        </div>
        <h1 v-if="content_everyAagamFile">
          Jain Aagam {{ content_everyAagamFile.type }}
          <!-- {{ content_everyAagamFile.order[content_everyAagamFile.type].position }} -->
          <span v-if="content_everyAagamFile.title">
            - {{ content_everyAagamFile.title }}</span
          >
        </h1>
        <h1 v-if="!content_everyAagamFile && content_sutra_original">
          Jain Aagam {{ content_sutra_original.type }}
          <!-- {{ content_sutra_original.order[content_sutra_original.type].position }} -->
          <span v-if="content_sutra_original.title">
            - {{ content_sutra_original.title }}</span
          >
        </h1>
        <div v-if="content_sutra_original">
          <h2>Sutra</h2>
          <NuxtContent :document="content_sutra_original.sutra"></NuxtContent>
        </div>
        <section v-if="content_everyAagamFile">
          <NuxtContent :document="content_everyAagamFile"></NuxtContent>
        </section>
      </article>

      <!-- <h1 v-if="content_sutra">
          Aagam Sutra {{ content_sutra.order.sutra.position }}
          <span v-if="content_sutra.title"> - {{ content_sutra.title }}</span>
        </h1>
        <h1 v-if="!content_sutra && content_sutra_original">
          Aagam Sutra {{ content_sutra_original.order.sutra.position }}
        </h1> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content_everyAagamFile: null,
      // content_book: null,
      // content_section: null,
      // content_part: null,
      // content_chapter: null,
      // content_lesson: null,
      // content_sutra: null,
      content_sutra_original: null,
      routePath: "",
      pathMatch: "",
    };
  },
  async fetch() {
    // const _ = require("lodash");

    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;

    this.pathMatch = this.$route.params.pathMatch.endsWith("/")
      ? this.$route.params.pathMatch
      : `${this.$route.params.pathMatch}/`;

    // let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // Aagam content everything
    this.content_everyAagamFile = await this.$content("hi/aagam", {
      deep: true,
    })
      .where({
        $and: [
          { path: { $contains: this.$route.params.aagam } },
          {
            path: {
              $regex: [
                this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
                "gim",
              ],
            },
          },
        ],
      })
      .sortBy("slug")
      .fetch();

    this.content_everyAagamFile = this.content_everyAagamFile[0];

    if (new RegExp(/sutra-[0-9]+\/$/i).test(this.routePath)) {
      this.content_sutra_original = await this.$content("aagam", {
        deep: true,
      })
        .where({
          $and: [
            { type: "sutra" },
            { path: { $contains: this.$route.params.aagam } },
            {
              path: {
                $regex: [
                  this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
                  "gim",
                ],
              },
            },
          ],
        })
        .sortBy("slug")
        .fetch();

      this.content_sutra_original = this.content_sutra_original[0];
    }
  },
};
</script>

<style lang="postcss">
.nuxt-content p,
a,
ul,
ol,
li,
blockquote {
  @apply tw-my-3 !important;
}

.nuxt-content h1,
h2,
h3,
h4 {
  @apply tw-my-4 !important;
}
</style>