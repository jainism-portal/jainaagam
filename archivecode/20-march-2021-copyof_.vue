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
        <h1>Aagam Book {{ content_book.order.book.position }}</h1>
        {{ `${content_book.children.type}s`.toUpperCase() }}:
        <NuxtContent :document="content_book"></NuxtContent>
      </article>

      <article v-if="content_section">
        <h1>Aagam Section {{ content_section.order.section.position }}</h1>
        {{ `${content_section.children.type}s`.toUpperCase() }}:
        <NuxtContent :document="content_section"></NuxtContent>
      </article>

      <article v-if="content_part">
        <h1>Aagam Part {{ content_part.order.part.position }}</h1>
        {{ `${content_part.children.type}s`.toUpperCase() }}:
        <NuxtContent :document="content_part"></NuxtContent>
      </article>

      <article v-if="content_chapter">
        <h1>
          Aagam Chapter {{ content_chapter.order.chapter.position }} -
          {{ content_chapter.title }}
          <span v-if="content_chapter.trans"
            >({{ content_chapter.trans }})</span
          >
        </h1>
        <NuxtContent :document="content_chapter"></NuxtContent>
      </article>

      <article v-if="content_lesson">
        <h1>Aagam Lesson {{ content_lesson.order.lesson.position }}</h1>
        {{ `${content_lesson.children.type}s`.toUpperCase() }}:
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
    const _ = require("lodash");

    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;

    this.pathMatch = this.$route.params.pathMatch.endsWith("/")
      ? this.$route.params.pathMatch
      : `${this.$route.params.pathMatch}/`;

    let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // Aagam content book fetch
    if (new RegExp(/book-[0-9]+\/$/i).test(this.routePath)) {
      this.content_book = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { dir: { $contains: this.$route.params.aagam } },
            { type: "book" },
          ],
        })
        .fetch();

      this.content_book = this.content_book.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              `book-${i.order.book.position}/` === this.pathMatch
            );
          }
        }
      });

      this.content_book = this.content_book[0];
    }

    // Aagam content Section fetch
    if (new RegExp(/section-[0-9]+\/$/i).test(this.routePath)) {
      this.content_section = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { dir: { $contains: this.$route.params.aagam } },
            { type: "section" },
          ],
        })
        .fetch();

      this.content_section = this.content_section.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              `section-${i.order.section.position}/` === this.pathMatch
            );
          }
        }
      });

      this.content_section = this.content_section[0];
    }

    // Aagam content Part fetch
    if (new RegExp(/part-[0-9]+\/$/i).test(this.routePath)) {
      this.content_part = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { dir: { $contains: this.$route.params.aagam } },
            { type: "part" },
          ],
        })
        .fetch();

      this.content_part = this.content_part.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              (`book-${i.order.book.position}/part-${i.order.part.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/part-${i.order.part.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
      });

      this.content_part = this.content_part[0];
    }

    // Aagam content chapter fetch

    if (new RegExp(/chapter-[0-9]+\/$/i).test(this.routePath)) {
      this.content_chapter = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { type: "chapter" },
            { dir: { $contains: this.$route.params.aagam } },
          ],
        })
        .fetch();

      this.content_chapter = this.content_chapter.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            if (i.parent.type === "book") {
              return (
                this.$route.params.aagam === aagam.title &&
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/` ===
                  this.pathMatch
              );
            }
            if (i.parent.type === "section") {
              return (
                this.$route.params.aagam === aagam.title &&
                `section-${i.order.section.position}/chapter-${i.order.chapter.position}/` ===
                  this.pathMatch
              );
            }
          }
        }
      });

      this.content_chapter = this.content_chapter[0];
    }

    // Aagam content Lesson fetch
    if (new RegExp(/lesson-[0-9]+\/$/i).test(this.routePath)) {
      // To find lesson position (even double digit)
      let postPositionNumber = this.pathMatch.match(/[0-9]+(?=\/$)/gim)[0]
        .length;

      this.content_lesson = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { path: { $contains: this.$route.params.aagam } },
            // { type: "lesson" },
            {
              path: {
                $regex: [
                  this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
                  "gim",
                ],
              },
            },
            // {
            //   "order.lesson.position":
            //     Number(postPositionNumber) === 2
            //       ? Number(
            //           this.pathMatch.slice(
            //             this.pathMatch.length - (postPositionNumber + 1),
            //             this.pathMatch.length - (postPositionNumber - 1)
            //           )
            //         )
            //       : Number(
            //           this.pathMatch.slice(
            //             this.pathMatch.length - (postPositionNumber + 1),
            //             this.pathMatch.length - 1
            //           )
            //         ),
            // },
            //
            // { path: { $regex: /(?<=-)[0-9]$/gim } },
          ],
        })
        .sortBy("slug")
        .fetch();

      // this.pathMatch --> "book-1/chapter-1/lesson-1/"
      // path --> "/hi/aagam/1-anga/1-acharanga/book-1/chapter-1/lesson-1/sutra-1"

      // console.log(this.pathMatch.slice(0, this.pathMatch.length - 1));
      // book-1/chapter-1/lesson-1

      // let abc =
      //   Number(postPositionNumber) === 2
      //     ? Number(
      //         this.pathMatch.slice(
      //           this.pathMatch.length - (postPositionNumber + 1),
      //           this.pathMatch.length - (postPositionNumber - 1)
      //         )
      //       )
      //     : Number(
      //         this.pathMatch.slice(
      //           this.pathMatch.length - (postPositionNumber + 1),
      //           this.pathMatch.length - 1
      //         )
      //       );
      // console.log(abc);
      //
      // console.log(this.content_lesson.length, this.content_lesson);

      // Due to regex in query, no need of this below filter now:
      // this.content_lesson = this.content_lesson.filter((i) => {
      //   for (const aagam of aagam_list.aagams) {
      //     if (aagam.position === i.order.aagam.position) {
      //       return (
      //         this.$route.params.aagam === aagam.title &&
      //         // "book-1/chapter-1/lesson-1"

      //         `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/` ===
      //           this.pathMatch
      //       );
      //     }
      //   }
      // });

      this.content_lesson = this.content_lesson[0];
    }

    // Aagam content Sutra fetch
    if (new RegExp(/sutra-[0-9]+\/$/i).test(this.routePath)) {
      this.content_sutra = await this.$content("hi/aagam", { deep: true })
        .where({
          $and: [
            { dir: { $contains: this.$route.params.aagam } },
            { type: "sutra" },
          ],
        })
        .fetch();

      this.content_sutra = this.content_sutra.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            if (
              i.order &&
              i.order.book &&
              i.order.chapter &&
              i.order.lesson &&
              i.order.sutra
            ) {
              return (
                // "book-1/chapter-1/lesson-1/sutra-1"
                this.$route.params.aagam === aagam.title &&
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}/` ===
                  this.pathMatch
              );
            }
            if (i.order && i.order.section) {
              return (
                // "section-1/chapter-1/sutra-1"
                this.$route.params.aagam === aagam.title &&
                `section-${i.order.section.position}/chapter-${i.order.chapter.position}/sutra-${i.order.sutra.position}/` ===
                  this.pathMatch
              );
            }
          }
        }
      });
      this.content_sutra = this.content_sutra[0];

      this.content_sutra_original = await this.$content("aagam", { deep: true })
        .where({
          $and: [
            { dir: { $contains: this.$route.params.aagam } },
            { type: "sutra" },
          ],
        })
        .fetch();

      this.content_sutra_original = this.content_sutra_original.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            if (
              i.order &&
              i.order.book &&
              i.order.chapter &&
              i.order.lesson &&
              i.order.sutra
            ) {
              return (
                // "book-1/chapter-1/lesson-1/sutra-1"
                this.$route.params.aagam === aagam.title &&
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}/` ===
                  this.pathMatch
              );
            }

            if (
              i.order &&
              i.order.section &&
              i.order.chapter &&
              i.order.sutra
            ) {
              return (
                // "section-1/chapter-1/sutra-1"
                this.$route.params.aagam === aagam.title &&
                `section-${i.order.section.position}/chapter-${i.order.chapter.position}/sutra-${i.order.sutra.position}/` ===
                  this.pathMatch
              );
            }
          }
        }
      });

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