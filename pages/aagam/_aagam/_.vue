<template>
  <div>
    <!-- <ol>
      <li v-for="aag in aagam" :key="aag.title">
        {{ aag }}
      </li>
    </ol> -->
    <!-- {{ aagam }} -->
    <div v-if="content_book">
      <h1>Book {{ content_book.order.book.position }}</h1>
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
    </div>

    <div v-if="content_part">
      <h1>Part {{ content_part.order.part.position }}</h1>
      {{ `${content_part.children.type}s`.toUpperCase() }}:
      <ol>
        <li v-for="(child, i) in content_part.children.children" :key="child">
          <nuxt-link :to="`${content_part.children.type}-${i + 1}`">
            {{ child }}
          </nuxt-link>
        </li>
      </ol>
      <NuxtContent :document="content_part"></NuxtContent>
    </div>

    <div v-if="content_chapter">
      <h1>
        Chapter {{ content_chapter.order.chapter.position }} -
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
    </div>
    <div v-if="content_lesson">
      <h1>Lesson {{ content_lesson.order.lesson.position }}</h1>
      {{ `${content_lesson.children.type}s`.toUpperCase() }}:
      <ol>
        <li v-for="n in content_lesson.children.count" :key="n">
          <nuxt-link :to="{ path: `${$route.fullPath}/sutra-${n}` }">
            Sutra {{ n }}
          </nuxt-link>
        </li>
      </ol>
      <NuxtContent :document="content_lesson"></NuxtContent>
    </div>

    <div v-if="content_sutra">
      <h1>Sutra {{ content_sutra.order.lesson.position }}</h1>
      <NuxtContent :document="content_sutra"></NuxtContent>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aagams: [],
      aagam: [],
      books: [],
      chapters: null,
      lessons: [],
      content_book: null,
      content_part: null,
      content_chapter: null,
      content_lesson: null,
      content_sutra: null,
    };
  },
  async fetch() {
    let _ = require("lodash");

    this.aagams = await this.$content("aagam-meta").fetch();

    for (const aagamsall of this.aagams) {
      this.aagam = aagamsall.aagams.filter((aagam) => {
        return aagam.title == this.$route.params.aagam;
      });
    }

    for (const aag of this.aagam) {
      if (aag.books) {
        this.books = aag.books.filter((book) => {
          return (
            `book-${book.book}` == this.$route.params.pathMatch ||
            `book-${book.book}/` == this.$route.params.pathMatch
          );
          // pathMatch = "book-1/"
        });
      }
    }
    // Aagam content book fetch
    if (
      this.$route.params.pathMatch === "book-1" ||
      this.$route.params.pathMatch === "book-1/" ||
      this.$route.params.pathMatch === "book-2" ||
      this.$route.params.pathMatch === "book-2/" ||
      this.$route.params.pathMatch === "book-3" ||
      this.$route.params.pathMatch === "book-3/" ||
      this.$route.params.pathMatch === "book-4" ||
      this.$route.params.pathMatch === "book-4/" ||
      this.$route.params.pathMatch === "book-5" ||
      this.$route.params.pathMatch === "book-5/"
    ) {
      this.content_book = await this.$content("hi/aagam", { deep: true })
        .where({ type: "book" })
        .fetch();

      this.content_book = this.content_book.filter((i) => {
        return (
          `book-${i.order.book.position}` === this.$route.params.pathMatch ||
          `book-${i.order.book.position}/` === this.$route.params.pathMatch
        );
      });

      this.content_book = this.content_book[0];
    }

    // Aagam content Part fetch
    if (
      this.$route.params.pathMatch === "book-2/part-1" ||
      this.$route.params.pathMatch === "book-2/part-1/" ||
      this.$route.params.pathMatch === "book-2/part-2" ||
      this.$route.params.pathMatch === "book-2/part-2/" ||
      this.$route.params.pathMatch === "book-2/part-3" ||
      this.$route.params.pathMatch === "book-2/part-3/" ||
      this.$route.params.pathMatch === "book-2/part-4" ||
      this.$route.params.pathMatch === "book-2/part-4/"
    ) {
      this.content_part = await this.$content("hi/aagam", { deep: true })
        .where({ type: "part" })
        .fetch();

      this.content_part = this.content_part.filter((i) => {
        return (
          `book-${i.order.book.position}/part-${i.order.part.position}` ===
            this.$route.params.pathMatch ||
          `book-${i.order.book.position}/part-${i.order.part.position}/` ===
            this.$route.params.pathMatch
        );
      });

      this.content_part = this.content_part[0];
    }
    // Aagam content chapter fetch

    this.content_chapter = await this.$content("hi/aagam", { deep: true })
      .where({ type: "chapter" })
      .fetch();

    this.content_chapter = this.content_chapter.filter((i) => {
      return (
        `book-${i.order.book.position}/chapter-${i.order.chapter.position}` ===
          this.$route.params.pathMatch ||
        `book-${i.order.book.position}/chapter-${i.order.chapter.position}/` ===
          this.$route.params.pathMatch
      );
      // pathMatch:"book-1/chapter-2"
    });

    this.content_chapter = this.content_chapter[0];

    // Aagam content Lesson fetch
    if (
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-1" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-1/" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-2" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-2/" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-3" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-3/" ||
      this.$route.params.pathMatch === "book-1/chapter-2/lesson-1/" ||
      this.$route.params.pathMatch === "book-1/chapter-2/lesson-2" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-2/" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-3" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-3/" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-4" ||
      this.$route.params.pathMatch === "book-1/chapter-1/lesson-4/" ||
      this.$route.params.pathMatch === "book-1/chapter-2/lesson-2" ||
      this.$route.params.pathMatch === "book-1/chapter-2/lesson-2/"
    ) {
      this.content_lesson = await this.$content("hi/aagam", { deep: true })
        .where({ type: "lesson" })
        .fetch();

      this.content_lesson = this.content_lesson.filter((i) => {
        return (
          // "book-1/chapter-1/lesson-1"

          `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}` ===
            this.$route.params.pathMatch ||
          `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/` ===
            this.$route.params.pathMatch
        );
      });

      this.content_lesson = this.content_lesson[0];
    }

    // Aagam content Sutra fetch
    let patt = new RegExp(/sutra-[0-9]+$/i);
    let patt_slash = new RegExp(/sutra-[0-9]+\/$/i);
    if (
      patt.test(this.$route.fullPath) ||
      patt_slash.test(this.$route.fullPath)
    ) {
      this.content_sutra = await this.$content("hi/aagam", { deep: true })
        .where({ type: "sutra" })
        .fetch();

      this.content_sutra = this.content_sutra.filter((i) => {
        return (
          // "book-1/chapter-1/lesson-1/sutra-1"

          `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}` ===
            this.$route.params.pathMatch ||
          `book-${i.order.book.position}/chapter-${i.order.chapter.position}/lesson-${i.order.lesson.position}/sutra-${i.order.sutra.position}/` ===
            this.$route.params.pathMatch
        );
      });

      this.content_sutra = this.content_sutra[0];
    }
  },
};
</script>

<style lang="postcss" scoped>
</style>