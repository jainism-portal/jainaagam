<template>
  <div>
    <NuxtContent :document="content_aagam"></NuxtContent>
    <!-- {{ content_aagam }} -->
    <section v-if="content_aagam">
      <h2 class="tw-capitalize">{{ content_aagam.children.type }}s</h2>
      <ol
        v-if="
          content_aagam &&
          content_aagam.children &&
          content_aagam.children.count
        "
      >
        <li v-for="n in content_aagam.children.count" :key="n">
          <nuxt-link :to="`${fullPath}${content_aagam.children.type}-${n}`">
            {{ content_aagam.children.type }} {{ n }}
          </nuxt-link>
        </li>
      </ol>
    </section>
    <section v-else>
      <p>This Aagam is yet to be added</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "aagamIndividual", // to avoid console error --> [Vue warn]: Invalid component name
  data() {
    return {
      content_aagam: null,
      fullPath: "",
      // aagams: [],
      // aagam: [],
      // books: [],
    };
  },
  async fetch() {
    this.fullPath = this.$route.fullPath.endsWith("/")
      ? this.$route.fullPath
      : `${this.$route.fullPath}/`;

    let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    this.content_aagam = await this.$content("hi/aagam", { deep: true })
      .where(
        { type: "aagam" }
        // { dir: { $contains: this.$route.params.aagam } }
      )
      .fetch();

    this.content_aagam = this.content_aagam.filter((i) => {
      for (const aagam of aagam_list.aagams) {
        if (aagam.position === i.order.aagam.position) {
          return this.$route.params.aagam === aagam.title;
        }
      }
    });

    this.content_aagam = this.content_aagam[0];

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