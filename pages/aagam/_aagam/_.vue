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
      <ol>
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
    </div>
    <div v-if="content_chapter">
      <h1>
        Chapter {{ content_chapter.order.chapter.position }} -
        {{ content_chapter.title }} ({{ content_chapter.trans }})
      </h1>

      <div v-if="content_chapter">
        <NuxtContent :document="content_chapter"></NuxtContent>
        <ol>
          <li v-for="n in content_chapter.children.count" :key="n">
            <nuxt-link
              :to="`/aagam/${content_chapter.parent.type}-${content_chapter.order.chapter}/chapter-1/lesson-${n}`"
            >
              Lesson {{ n }}
            </nuxt-link>
          </li>
        </ol>
      </div>
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
      content_chapter: null,
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
            `book-${book.book}/` == this.$route.params.pathMatch ||
            `book-${book.book}` == this.$route.params.pathMatch
          );
          // pathMatch = "book-1/"
        });
      }
    }
    // Aagam content book fetch
    if (this.$route.params.pathMatch === "book-1/") {
      this.content_book = await this.$content("hi/aagam", { deep: true })
        .where({ type: "book" })
        .fetch();

      this.content_book = this.content_book[0];
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
  },
};
</script>

<style lang="postcss" scoped>
</style>