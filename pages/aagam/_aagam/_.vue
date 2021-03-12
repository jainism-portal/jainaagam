<template>
  <div>
    <!-- <ol>
      <li v-for="aag in aagam" :key="aag.title">
        {{ aag }}
      </li>
    </ol> -->
    <!-- {{ aagam }} -->
    <div v-if="books && books.length > 0">
      <div v-for="book in books" :key="book.book">
        <h1>Book {{ book.book }}</h1>
        Chapters:
        <ol>
          <li v-for="chapter in book.chapters" :key="chapter.chapter_no">
            <nuxt-link
              :to="`/aagam/${$route.params.aagam}/book-${book.book}/chapter-${chapter.chapter_no}`"
            >
              {{ chapter.chapter_no }}. {{ chapter.chapter }}
            </nuxt-link>
          </li>
        </ol>
      </div>
    </div>
    <div v-if="aagam_content_chapter">
      <h1>Chapter {{ aagam_content_chapter.depth.chapter }}</h1>

      <div v-if="aagam_content_chapter">
        <NuxtContent :document="aagam_content_chapter"></NuxtContent>
        <ol>
          <li v-for="n in aagam_content_chapter.children.count" :key="n">
            Lesson {{ n }}
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
      aagam_content_chapter: null,
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

    // Aagam content fetch

    this.aagam_content_chapter = await this.$content("hi/aagam", { deep: true })
      .where({ type: "chapter" })
      .fetch();

    this.aagam_content_chapter = this.aagam_content_chapter.filter((i) => {
      return (
        `book-${i.depth.book}/chapter-${i.depth.chapter}` ===
          this.$route.params.pathMatch ||
        `book-${i.depth.book}/chapter-${i.depth.chapter}/` ===
          this.$route.params.pathMatch
      );
      // pathMatch:"book-1/chapter-2"
    });

    this.aagam_content_chapter = this.aagam_content_chapter[0];
  },
};
</script>

<style lang="postcss" scoped>
</style>