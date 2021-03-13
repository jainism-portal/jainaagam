<template>
  <div>
    <div v-if="$fetchState.pending">Fetching content... Wait a few seconds</div>
    <div
      v-else-if="
        (content_book === null &&
          content_part === null &&
          content_chapter === null &&
          content_lesson === null &&
          content_sutra === null) ||
        $fetchState.error
      "
    >
      Wrong URL. Check URL again or go Home.
    </div>
    <div v-else>
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
        <!-- <ol>
          <li v-for="chapter in book.chapters" :key="chapter.chapter_no">
            <nuxt-link
              :to="`/aagam/${$route.params.aagam}/book-${book.book}/chapter-${chapter.chapter_no}`"
            >
              {{ chapter.chapter_no }}. {{ chapter.chapter }}
            </nuxt-link>
          </li>
        </ol> -->
        <ol v-if="content_book.children.type === 'chapter'">
          <li v-for="(child, i) in content_book.children.children" :key="child">
            <nuxt-link
              :to="`/aagam/${$route.params.aagam}/${content_book.type}-${
                content_book.order.book.position
              }/${content_book.children.type}-${i + 1}`"
            >
              {{ child }}
            </nuxt-link>
          </li>
        </ol>
        <ol v-if="content_book.children.type === 'part'">
          <li v-for="n in content_book.children.count" :key="n">
            <nuxt-link :to="`part-${n}`"> Part {{ n }} </nuxt-link>
          </li>
        </ol>
        <NuxtContent :document="content_book"></NuxtContent>
      </article>

      <article v-if="content_part">
        <h1>Aagam Part {{ content_part.order.part.position }}</h1>
        {{ `${content_part.children.type}s`.toUpperCase() }}:
        <ol>
          <li v-for="(child, i) in content_part.children.children" :key="child">
            <nuxt-link :to="`${content_part.children.type}-${i + 1}`">
              {{ child }}
            </nuxt-link>
          </li>
        </ol>
        <NuxtContent :document="content_part"></NuxtContent>
      </article>

      <article v-if="content_chapter">
        <h1>
          Aagam Chapter {{ content_chapter.order.chapter.position }} -
          {{ content_chapter.title }} ({{ content_chapter.trans }})
        </h1>

        <ol>
          <li v-for="n in content_chapter.children.count" :key="n">
            <nuxt-link :to="`${$route.fullPath}/lesson-${n}`">
              Lesson {{ n }}
            </nuxt-link>
          </li>
        </ol>
        <NuxtContent :document="content_chapter"></NuxtContent>
      </article>
      <article v-if="content_lesson">
        <h1>Aagam Lesson {{ content_lesson.order.lesson.position }}</h1>
        {{ `${content_lesson.children.type}s`.toUpperCase() }}:
        <ol>
          <li v-for="n in content_lesson.children.count" :key="n">
            <nuxt-link :to="{ path: `${$route.fullPath}/sutra-${n}` }">
              Sutra {{ n }}
            </nuxt-link>
          </li>
        </ol>
        <NuxtContent :document="content_lesson"></NuxtContent>
      </article>

      <article>
        <h1 v-if="content_sutra">
          Aagam Sutra {{ content_sutra.order.sutra.position }} -
          <span v-if="content_sutra.title">{{ content_sutra.title }}</span>
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
      content_part: null,
      content_chapter: null,
      content_lesson: null,
      content_sutra: null,
      content_sutra_original: null,
    };
  },
  async fetch() {
    const _ = require("lodash");

    let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // Aagam content book fetch
    if (
      new RegExp(/book-[0-9]+$/i).test(this.$route.fullPath) ||
      new RegExp(/book-[0-9]+\/$/i).test(this.$route.fullPath)
    ) {
      this.content_book = await this.$content("hi/aagam", { deep: true })
        .where({ type: "book" })
        .fetch();

      this.content_book = this.content_book.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              (`book-${i.order.book.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
      });

      this.content_book = this.content_book[0];
    }

    // Aagam content Part fetch
    if (
      new RegExp(/part-[0-9]+$/i).test(this.$route.fullPath) ||
      new RegExp(/part-[0-9]+\/$/i).test(this.$route.fullPath)
    ) {
      this.content_part = await this.$content("hi/aagam", { deep: true })
        .where({ type: "part" })
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

    if (
      new RegExp(/chapter-[0-9]+$/i).test(this.$route.fullPath) ||
      new RegExp(/chapter-[0-9]+\/$/i).test(this.$route.fullPath)
    ) {
      this.content_chapter = await this.$content("hi/aagam", { deep: true })
        .where({ type: "chapter" })
        .fetch();

      this.content_chapter = this.content_chapter.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              (`book-${i.order.book.position}/chapter-${i.order.chapter.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
        // pathMatch:"book-1/chapter-1"
      });

      this.content_chapter = this.content_chapter[0];
    }

    // Aagam content Lesson fetch
    if (
      new RegExp(/lesson-[0-9]+$/i).test(this.$route.fullPath) ||
      new RegExp(/lesson-[0-9]+\/$/i).test(this.$route.fullPath)
    ) {
      this.content_lesson = await this.$content("hi/aagam", { deep: true })
        .where({ type: "lesson" })
        .fetch();

      this.content_lesson = this.content_lesson.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              this.$route.params.aagam === aagam.title &&
              // "book-1/chapter-1/lesson-1"
              (`book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
      });

      this.content_lesson = this.content_lesson[0];
    }

    // Aagam content Sutra fetch
    if (
      new RegExp(/sutra-[0-9]+$/i).test(this.$route.fullPath) ||
      new RegExp(/sutra-[0-9]+\/$/i).test(this.$route.fullPath)
    ) {
      this.content_sutra = await this.$content("hi/aagam", { deep: true })
        .where({ type: "sutra" })
        .fetch();

      this.content_sutra = this.content_sutra.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              // "book-1/chapter-1/lesson-1/sutra-1"
              this.$route.params.aagam === aagam.title &&
              (`book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
      });

      this.content_sutra = this.content_sutra[0];

      this.content_sutra_original = await this.$content("aagam", { deep: true })
        .where({ type: "sutra" })
        .fetch();

      this.content_sutra_original = this.content_sutra_original.filter((i) => {
        for (const aagam of aagam_list.aagams) {
          if (aagam.position === i.order.aagam.position) {
            return (
              // "book-1/chapter-1/lesson-1/sutra-1"
              this.$route.params.aagam === aagam.title &&
              (`book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}` ===
                this.$route.params.pathMatch ||
                `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}/` ===
                  this.$route.params.pathMatch)
            );
          }
        }
      });

      this.content_sutra_original = this.content_sutra_original[0];
    }
  },
};
</script>

<style lang="postcss">
h1 {
  @apply tw-py-2 tw-tracking-wide tw-text-3xl;
}
h2 {
  @apply tw-py-2 tw-tracking-wide tw-text-2xl tw-border-b tw-border-pink-300;
}
h3 {
  @apply tw-py-2 tw-tracking-wide tw-text-xl tw-border-b tw-border-blue-300;
}
p {
  @apply tw-py-2 tw-tracking-wide tw-text-lg;
}
ol {
  @apply tw-list-decimal tw-list-inside tw-py-2 tw-text-lg;
}
ul {
  @apply tw-list-disc tw-list-inside tw-py-2 tw-text-lg;
}
</style>