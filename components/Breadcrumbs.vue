<template>
  <nav class="">
    <v-breadcrumbs
      :large="$vuetify.breakpoint.mdAndUp ? true : false"
      :items="breadcrumbs"
      class="tw-text-linkblue tw-capitalize"
    >
      <template v-slot:divider>
        <v-icon class="!tw-text-gray-300">{{mdiArrowRight}}</v-icon>
      </template>
    </v-breadcrumbs>
  </nav>
</template>

<script>
import { mdiArrowRight } from "@mdi/js";

export default {
  props: { pathMatch: String, path: String, post: { type: Object } },
  data() {
    return { mdiArrowRight, urls: [], titles: [], breadcrumbs: [] };
  },
  async fetch() {
    // "/hi/aagam/acharanga/book-1/chapter-1/lesson-1/sutra-1/"

    this.titles = this.path.split("/");
    this.titles.shift(); // first item is empty string, so remove
    if (this.$i18n.locale !== "en") {
      this.titles.shift(); // second item is locale for non-English paths, so remove
    }
    this.titles.pop(); // last item is trailing slash, so remove

    this.urls = [...this.titles]; // Create new array of URLs

    // this.urls[1] = `/${this.urls[0]}/${this.urls[1]}/`;
    // this.urls[2] = `/${this.urls[1]}/${this.urls[2]}/`;
    // this.urls[3] = `/${this.urls[2]}/${this.urls[3]}/`;

    this.urls.forEach((url, i) => {
      if (i === 0) {
        this.urls[0] = `/${this.urls[0]}`;
      } else {
        this.urls[i] = `${this.urls[i - 1]}/${this.urls[i]}`;
      }
    });

    ///////////////////
    // TODO
    if (this.$i18n.locale === "hi") {
      //   this.titles.map(title => {
      //     title
      //       .replace(/toc/, this.$t("contents.toc"))
      //       .replace(/appendix/, this.$t("contents.appendix"))
      //       .replace(/book/, this.$t("contents.book"))
      //       .replace(/chapter/, this.$t("contents.chapter"))
      //       .replace(/episode/, this.$t("contents.episode"))
      //       .replace(/lesson/, this.$t("contents.lesson"))
      //       .replace(/part/, this.$t("contents.part"))
      //       .replace(/sutra/, this.$t("contents.sutra"));
      //   });
      this.titles.splice(0, 1, "आगम");
    }
    ////////////////////

    // Now let's merge the two Arrays titles and urls into specific Array of Objects format required by Vuetify

    this.titles.forEach((item, i) => {
      this.breadcrumbs[i] = [
        {
          text: this.titles[i].replace(/-/g, " "),
          to: this.localePath(this.urls[i]),
          exact: true
        }
      ];
    });
    this.breadcrumbs.unshift([
      { text: "🏠", to: this.localePath(`/`), exact: true }
    ]);
    this.breadcrumbs = this.breadcrumbs.flat(2); // or Infinity // https://www.samanthaming.com/tidbits/71-how-to-flatten-array-using-array-flat/#infinitely-nested-arrays
  }
};
</script>