<template>
  <div>
    <v-breadcrumbs
      large
      :items="breadcrumbs"
      divider="👉🏻"
      class="tw-text-pink-800 tw-capitalize tw-font-medium"
    >
    </v-breadcrumbs>
  </div>
</template>

<script>
// import _ from "lodash";

export default {
  props: { pathMatch: String, fullPathMatch: String, post: { type: Object } },
  data() {
    return {
      urls: [],
      titles: [],
      breadcrumbs: []
      // breadcrumbsTrial: [
      //   { text: "magazines", to: "/magazines/", exact: true },
      //   { text: "vision", to: "/magazines/vision/", exact: true }
      // ]
    };
  },
  async fetch() {
    // // let full = "/hi/aagam/acharanga/book-1/chapter-1/lesson-1/sutra-1/";

    // // let fullarray = full.split("/");
    // fullarray.shift(); // first item is empty string, so remove
    // fullarray.shift(); // second item is locale, so remove
    // fullarray.pop(); // last item is empty string, so remove
    // // console.log("FULLARRay after SHIFT 👉🏻" + fullarray);

    this.titles = this.fullPathMatch.split("/");
    this.titles.shift(); // first item is empty string, so remove
    this.titles.shift(); // second item is locale, so remove
    this.titles.pop(); // last item is empty string, so remove
    // console.log("Titles after POP 👉🏻" + this.titles);

    this.urls = [...this.titles]; // Create new array of URLs

    // this.urls[1] = `/${this.urls[0]}/${this.urls[1]}`;
    // this.urls[2] = `/${this.urls[1]}/${this.urls[2]}`;
    // this.urls[3] = `/${this.urls[2]}/${this.urls[3]}`;
    if (this.urls && this.urls.length > 0) {
      this.urls.forEach((url, i) => {
        i > 0
          ? (this.urls[i] = `${this.urls[i - 1]}/${this.urls[i]}`)
          : (this.urls[0] = `/${this.$i18n.locale}/${this.urls[0]}`);
      });
    }

    // Now let's merge the two Arrays titles and urls into specific Array of Objects format required by Vuetify

    this.titles.forEach((item, i) => {
      this.breadcrumbs[i] = [
        { text: this.titles[i], to: this.urls[i], exact: true }
      ];
    });
    this.breadcrumbs.unshift([{ text: "🏠", to: "/", exact: true }]);
    // this.breadcrumbs = _.flattenDeep(this.breadcrumbs);
    this.breadcrumbs = this.breadcrumbs.flat(2); // or Infinity // https://www.samanthaming.com/tidbits/71-how-to-flatten-array-using-array-flat/#infinitely-nested-arrays
  }
};
</script>

<style lang="sass" scoped>
// .v-breadcrumbs
  // padding-left: 1rem !important
  // padding-right: 1rem !important
</style>