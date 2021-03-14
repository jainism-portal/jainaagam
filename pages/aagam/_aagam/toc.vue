<template>
  <div class="tw-mx-auto tw-max-w-lg">
    <div>
      <div v-for="aagam in aagams" :key="aagam.title">
        <h1>अनुक्रमणिका - {{ aagam.title }}</h1>
        <ol>
          <li v-for="n in aagam.children.count" :key="n">
            {{ aagam.children.type }} {{ n }}
            
            <div v-for="(book, i) in books" :key="i">
              <ol>
                <li v-for="n in book.children.count" :key="n">
                  {{ book.children.type }} {{ n }}
                </li>
              </ol>
            </div>
          </li>
        </ol>
        <!-- <ol>
          <li v-for="book in books" :key="book">
            {{ book.title }} - {{ book.order.aagam.position }} -
            {{ book.order.book.position }}
            <ol>
              <li v-for="child in book.children.children" :key="child">
                {{ child }}
              </li>
              <li v-for="chapter in chapters" :key="chapter">
                {{ chapter.title }} - {{ chapter.order.aagam.position }} -
                {{ chapter.order.book.position }} -
                {{ chapter.order.chapter.position }}
              </li>
            </ol>
          </li>
        </ol> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aagams: null,
      books: null,
      chapters: null,
      fullPath: "",
      children_name: "",
    };
  },
  async fetch() {
    let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();
    let content_aagam,
      content_book,
      content_section,
      content_part,
      content_lesson,
      content_chapter,
      content_sutra;

    // let word = "acharanga";
    // console.log(
    //   new RegExp(word + "\\b", "i").test("/hi/aagam/1-anga/1-acharanga")
    // );

    content_aagam = await this.$content("hi/aagam", { deep: true })
      .without(["body", "toc"])
      .sortBy("title")
      .where({
        $and: [
          { type: "aagam" },
          // { "order.aagam.position": aagam.position }
          { dir: { $regex: [this.$route.params.aagam + "$", "i"] } },
          // "/hi/aagam/1-anga/1-acharanga"
        ],
      })
      .fetch();

    // content_aagam = content_aagam.filter((i) => {
    //   for (const aagam of aagam_list.aagams) {
    //     if (aagam.position === i.order.aagam.position) {
    //       return this.$route.params.aagam === aagam.title;
    //     }
    //   }
    // });

    this.aagams = content_aagam;

    let aagamInd = content_aagam[0];

    if (aagamInd.children.type === "book") {
      content_book = await this.$content("hi/aagam", {
        deep: true,
      })
        .without(["body", "toc"])
        .sortBy("title")
        .where({
          $and: [
            { type: "book" },
            { "order.aagam.position": aagamInd.order.aagam.position },
            { dir: { $regex: [this.$route.params.aagam, "i"] } },
          ],
        })
        .fetch();
      this.books = content_book;
    }

    content_section = await this.$content("hi/aagam", { deep: true })
      .where({ type: "section" })
      .fetch();

    content_part = await this.$content("hi/aagam", { deep: true })
      .where({ type: "part" })
      .fetch();

    content_chapter = await this.$content("hi/aagam", { deep: true })
      .sortBy("order.chapter.position")
      .where({
        $and: [
          { type: "chapter" },
          { "order.aagam.position": aagamInd.order.aagam.position },
          // { "order.aagam.position": bookInd.order.aagam.position },
          { dir: { $regex: [this.$route.params.aagam, "i"] } },
        ],
      })
      .fetch();
    this.chapters = content_chapter;
  },
};
</script>

<style lang="postcss" scoped>
</style>