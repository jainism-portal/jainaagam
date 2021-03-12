<template>
  <div>
    {{ aagam }}
    {{ books }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      aagams: [],
      aagam: [],
      books: [],
    };
  },
  async fetch() {
    this.aagams = await this.$content("aagam-meta").fetch();

    // this.aagams_ind = this.aagams.filter((aagamall) => {
    //   for (const aagam of aagamall.aagams) {
    //     return aagam.title == this.$route.params.aagam;
    //   }
    // });

    for (const aagamsall of this.aagams) {
      this.aagam = aagamsall.aagams.filter((aagam) => {
        return aagam.title == this.$route.params.aagam;
      });
    }

    for (const aag of this.aagam) {
      // if (aag.books && aag.books.length > 0) {
      this.books = aag.books.filter((book) => {
        return `book-${book.book}/` == this.$route.params.pathMatch;
        // pathMatch = "book-1/"
      });
      // }
    }
  },
};
</script>

<style lang="postcss" scoped>
</style>