<template>
  <div>
    <NuxtContent :document="content_aagam[0]"></NuxtContent>
    <h2>Books</h2>
    <ol>
      <li v-for="n in content_aagam[0].children.count" :key="n">
        <nuxt-link :to="`${pathComputed}book-${n}`"> Book {{ n }} </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content_aagam: null,
      // aagams: [],
      // aagam: [],
      // books: [],
    };
  },
  computed: {
    pathComputed() {
      let fullPath;
      return (fullPath = this.$route.fullPath.endsWith("/")
        ? this.$route.fullPath
        : `${this.$route.fullPath}/`);
    },
  },
  async fetch() {
    this.content_aagam = await this.$content("hi/aagam", { deep: true })
      .where({
        $and: [
          { type: "aagam" },
          { dir: { $contains: this.$route.params.aagam } },
        ],
      })
      .fetch();

    // this.aagams = await this.$content("aagam-meta")
    //   .where({ type: "all" })
    //   .fetch();

    // this.aagams_ind = this.aagams.filter((aagamall) => {
    //   for (const aagam of aagamall.aagams) {
    //     return aagam.title == this.$route.params.aagam;
    //   }
    // });

    // for (const aagamsall of this.aagams) {
    //   this.aagam = aagamsall.aagams.filter((aagam) => {
    //     return aagam.title == this.$route.params.aagam;
    //   });
    // }

    //   for (const aag of this.aagam) {
    //     // if (aag.books && aag.books.length > 0) {
    //     this.books = aag.books.filter((book) => {
    //       return `book-${book.book}/` == this.$route.params.pathMatch;
    //       // pathMatch = "book-1/"
    //     });
    //     // }
    //   }
  },
};
</script>

<style lang="postcss" scoped>
</style>