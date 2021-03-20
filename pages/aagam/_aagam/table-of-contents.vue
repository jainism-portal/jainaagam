<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-pink tw-max-w-none">
    <nuxt-link to="/aagam/acharanga">Back to Aagam</nuxt-link>
    <!-- <NuxtContent :document="toc"></NuxtContent> -->
    <!-- {{ everything }} -->
    <h1 class="tw-capitalize">
      {{ $route.params.aagam }} Sutra - Table of Contents
    </h1>
    <ol>
      <li v-for="(bookitem, i) in books" :key="i">
        <nuxt-link
          v-if="bookitem.order.book.position"
          :to="`book-${bookitem.order.book.position}`"
        >
          Book
          <span v-if="bookitem.order.book.position">{{
            bookitem.order.book.position
          }}</span>
        </nuxt-link>
        <ul>
          <li v-for="(chapteritem, i) in chapters" :key="i">
            <details
              v-if="
                chapteritem.order.book.position === bookitem.order.book.position
              "
            >
              <summary>
                <nuxt-link
                  v-if="chapteritem.order.chapter.position"
                  :to="`book-${bookitem.order.book.position}/chapter-${chapteritem.order.chapter.position}`"
                >
                  Chapter
                  <span v-if="chapteritem.order.chapter.position">{{
                    chapteritem.order.chapter.position
                  }}</span>
                </nuxt-link>
              </summary>

              <ol>
                <li v-for="(lessonitem, i) in lessons" :key="i">
                  <div
                    v-if="
                      lessonitem.order.book.position ===
                        bookitem.order.book.position &&
                      lessonitem.order.chapter.position ===
                        chapteritem.order.chapter.position
                    "
                  >
                    <nuxt-link
                      v-if="lessonitem.order.lesson.position"
                      :to="`book-${bookitem.order.book.position}/chapter-${chapteritem.order.chapter.position}/lesson-${lessonitem.order.lesson.position}`"
                    >
                      Lesson {{ lessonitem.order.lesson.position }}
                    </nuxt-link>
                    <ul>
                      <li v-for="(sutraitem, i) in sutras" :key="i">
                        <div
                          v-if="
                            sutraitem.order.book.position ===
                              bookitem.order.book.position &&
                            sutraitem.order.chapter.position ===
                              chapteritem.order.chapter.position &&
                            sutraitem.order.lesson.position ===
                              lessonitem.order.lesson.position
                          "
                        >
                          <nuxt-link
                            v-if="sutraitem.order.sutra.position"
                            :to="`book-${bookitem.order.book.position}/chapter-${chapteritem.order.chapter.position}/lesson-${lessonitem.order.lesson.position}/sutra-${sutraitem.order.sutra.position}`"
                          >
                            Sutra {{ sutraitem.order.sutra.position }}
                          </nuxt-link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ol>
            </details>
          </li>
          <li v-for="(partitem, i) in parts" :key="i">
            <div
              v-if="
                partitem.order.book.position === bookitem.order.book.position
              "
            >
              <nuxt-link
                v-if="partitem.order.part.position"
                :to="`book-${bookitem.order.book.position}/part-${partitem.order.part.position}`"
                >Part {{ partitem.order.part.position }}</nuxt-link
              >
              <ul>
                <li v-for="(chapteritem, i) in chapters" :key="i">
                  <div
                    v-if="
                      chapteritem.order.book.position ===
                        bookitem.order.book.position &&
                      chapteritem.order.part.position ===
                        partitem.order.part.position
                    "
                  >
                    <nuxt-link
                      v-if="chapteritem.order.chapter.position"
                      :to="`book-${bookitem.order.book.position}/part-${partitem.order.part.position}/chapter-${chapteritem.order.chapter.position}`"
                    >
                      Chapter
                      <span v-if="chapteritem.order.chapter.position">{{
                        chapteritem.order.chapter.position
                      }}</span>
                    </nuxt-link>
                    <ol>
                      <li v-for="(lessonitem, i) in lessons" :key="i">
                        <div
                          v-if="
                            lessonitem.order.book.position ===
                              bookitem.order.book.position &&
                            lessonitem.order.part.position ===
                              partitem.order.part.position &&
                            lessonitem.order.chapter.position ===
                              chapteritem.order.chapter.position
                          "
                        >
                          <nuxt-link
                            v-if="lessonitem.order.lesson.position"
                            :to="`book-${bookitem.order.book.position}/part-${partitem.order.part.position}/chapter-${chapteritem.order.chapter.position}/lesson-${lessonitem.order.lesson.position}`"
                          >
                            Lesson {{ lessonitem.order.lesson.position }}
                          </nuxt-link>
                          <ul>
                            <li v-for="(sutraitem, i) in sutras" :key="i">
                              <div
                                v-if="
                                  sutraitem.order.book.position ===
                                    bookitem.order.book.position &&
                                  sutraitem.order.part.position ===
                                    partitem.order.part.position &&
                                  sutraitem.order.chapter.position ===
                                    chapteritem.order.chapter.position &&
                                  sutraitem.order.lesson.position ===
                                    lessonitem.order.lesson.position
                                "
                              >
                                <nuxt-link
                                  v-if="sutraitem.order.sutra.position"
                                  :to="`book-${bookitem.order.book.position}/part-${partitem.order.part.position}/chapter-${chapteritem.order.chapter.position}/lesson-${lessonitem.order.lesson.position}/sutra-${sutraitem.order.sutra.position}`"
                                >
                                  Sutra {{ sutraitem.order.sutra.position }}
                                </nuxt-link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ol>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      everything: null,
      routePath: "",
      pathMatch: "",
      books: null,
      chapters: null,
      lessons: null,
      parts: null,
      sections: null,
      sutras: null,
      toc: null,
    };
  },
  async fetch() {
    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;

    // this.pathMatch = this.$route.params.pathMatch.endsWith("/")
    //   ? this.$route.params.pathMatch
    //   : `${this.$route.params.pathMatch}/`;

    // let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // Aagam content everything
    this.everything = await this.$content("hi/aagam", {
      deep: true,
    })
      .without(["body", "toc"])
      .where({
        $and: [
          { path: { $contains: this.$route.params.aagam } },
          // {
          //   path: {
          //     $regex: [
          //       this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
          //       "gim",
          //     ],
          //   },
          // },
        ],
      })
      .sortBy("slug")
      .fetch();

    this.books = this.everything.filter((i) => {
      return i.type === "book";
    });
    this.chapters = this.everything.filter((i) => {
      return i.type === "chapter";
    });
    this.lessons = this.everything.filter((i) => {
      return i.type === "lesson";
    });
    this.sections = this.everything.filter((i) => {
      return i.type === "section";
    });
    this.parts = this.everything.filter((i) => {
      return i.type === "part";
    });
    this.sutras = this.everything.filter((i) => {
      return i.type === "sutra";
    });

    this.toc = await this.$content("hi/aagam", {
      deep: true,
    })
      .where({
        $and: [
          { path: { $contains: this.$route.params.aagam } },
          { type: "toc" },
        ],
      })
      .sortBy("slug")
      .fetch();
    this.toc = this.toc[0];
  },
};
</script>

<style lang="scss" scoped>
</style>