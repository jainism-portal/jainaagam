<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <div v-if="$fetchState.pending">Fetching content... Wait a few seconds</div>
    <div
      v-else-if="
        (content_book === null &&
          content_section === null &&
          content_part === null &&
          content_chapter === null &&
          content_lesson === null &&
          content_sutra === null) ||
        $fetchState.error
      "
    >
      Wrong URL. Check URL again or go Home.
    </div>
    <div v-else class="tw-mx-2 sm:tw-mx-0">
      <Incomplete
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
      ></Incomplete>

      <article v-if="content_book">
        <h1>
          Jain Aagam Book {{ content_book.order.book.position }}
          <span v-if="content_book.title"> - {{ content_book.title }}</span>
        </h1>
        <NuxtContent :document="content_book"></NuxtContent>
      </article>

      <article v-if="content_section">
        <h1>
          Jain Aagam Section {{ content_section.order.section.position }}
          <span v-if="content_section.title">
            - {{ content_section.title }}</span
          >
        </h1>
        <NuxtContent :document="content_section"></NuxtContent>
      </article>

      <article v-if="content_part">
        <h1>
          Jain Aagam Part {{ content_part.order.part.position }}
          <span v-if="content_part.title"> - {{ content_part.title }}</span>
        </h1>
        <NuxtContent :document="content_part"></NuxtContent>
      </article>

      <article v-if="content_chapter">
        <h1>
          Jain Aagam Chapter {{ content_chapter.order.chapter.position }}
          <span v-if="content_chapter.title">
            - {{ content_chapter.title }}</span
          >
        </h1>
        <NuxtContent :document="content_chapter"></NuxtContent>
      </article>

      <article v-if="content_lesson">
        <h1>
          Jain Aagam Lesson {{ content_lesson.order.lesson.position }}
          <span v-if="content_lesson.title"> - {{ content_lesson.title }}</span>
        </h1>
        <NuxtContent :document="content_lesson"></NuxtContent>
      </article>

      <article>
        <div
          v-if="content_sutra && content_sutra.order"
          class="tw-text-center tw-my-2 md:tw-my-4"
        >
          <p
            v-for="(items, i) in Object.entries(content_sutra.order)"
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
        <h1 v-if="content_sutra">
          Aagam Sutra {{ content_sutra.order.sutra.position }}
          <span v-if="content_sutra.title"> - {{ content_sutra.title }}</span>
        </h1>
        <h1 v-if="!content_sutra && content_sutra_original">
          Aagam Sutra {{ content_sutra_original.order.sutra.position }}
        </h1>

        <section v-if="content_sutra_original">
          <h2>Sutra</h2>
          <NuxtContent :document="content_sutra_original.sutra"></NuxtContent>
        </section>
        <NuxtContent
          :document="content_sutra"
          v-if="content_sutra"
        ></NuxtContent>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content_book: null,
      content_section: null,
      content_part: null,
      content_chapter: null,
      content_lesson: null,
      content_sutra: null,
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

    // Aagam content book fetch
    if (new RegExp(/book-[0-9]+\/$/i).test(this.routePath)) {
      this.content_book = await this.$content("hi/aagam", { deep: true })
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

      this.content_book = this.content_book[0];
    }

    // Aagam content Section fetch
    if (new RegExp(/section-[0-9]+\/$/i).test(this.routePath)) {
      this.content_section = await this.$content("hi/aagam", { deep: true })
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

      this.content_section = this.content_section[0];
    }

    // Aagam content Part fetch
    if (new RegExp(/part-[0-9]+\/$/i).test(this.routePath)) {
      this.content_part = await this.$content("hi/aagam", { deep: true })
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

      this.content_part = this.content_part[0];
    }

    // Aagam content chapter fetch

    if (new RegExp(/chapter-[0-9]+\/$/i).test(this.routePath)) {
      this.content_chapter = await this.$content("hi/aagam", { deep: true })
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

      this.content_chapter = this.content_chapter[0];
    }

    // Aagam content Lesson fetch
    if (new RegExp(/lesson-[0-9]+\/$/i).test(this.routePath)) {
      this.content_lesson = await this.$content("hi/aagam", { deep: true })
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

      this.content_lesson = this.content_lesson[0];
    }

    // Aagam content Sutra fetch
    if (new RegExp(/sutra-[0-9]+\/$/i).test(this.routePath)) {
      this.content_sutra = await this.$content("hi/aagam", { deep: true })
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

      this.content_sutra = this.content_sutra[0];

      this.content_sutra_original = await this.$content("hi/aagam", {
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