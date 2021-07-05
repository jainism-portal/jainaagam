<template>
  <nav class="tw-py-3">
    <ol class="tw-flex tw-flex-wrap !tw-pl-4 tw-items-center">
      <li
        v-for="(breadcrumb,i) in breadcrumbs"
        :key="breadcrumb.text"
        class="tw-capitalize tw-text-sm md:tw-text-base"
        :class="i < breadcrumbs.length - 1 ? 'tw-text-linkblue' : 'tw-text-gray-400'"
      >
        <nuxt-link
          :to="breadcrumb.to"
          :exact="breadcrumb.exact"
          class="tw-mx-1"
          :class="{'hover:tw-underline' : i < breadcrumbs.length-1}"
        >{{breadcrumb.text}}</nuxt-link>
        <v-icon
          class="!tw-text-gray-200"
          v-if="i < breadcrumbs.length-1"
        >{{mdiArrowRight}}</v-icon>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mdiArrowRight } from "@mdi/js";

export default {
  props: { path: String },
  data() {
    return { mdiArrowRight, urls: [], titles: [], breadcrumbs: [] };
  },
  async fetch() {
    // "/hi/acharanga/book-1/chapter-1/lesson-1/sutra-1/"

    this.titles = this.path.split("/");

    // first item is empty string, so remove
    this.titles.shift();

    // second item is locale for non-English paths, so remove
    // if (this.$i18n.locale !== "en") this.titles.shift();

    // last item is trailing slash, so remove
    this.titles.pop();

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

    // Now let's merge the two Arrays titles and urls into specific Array of Objects format

    this.titles.forEach((item, i) => {
      this.breadcrumbs[i] = [
        {
          text: this.titles[i].replace(/-/g, " "),
          to: this.urls[i],
          exact: true
        }
      ];
    });
    this.breadcrumbs.unshift([{ text: "🏠", to: `/`, exact: true }]);
    this.breadcrumbs = this.breadcrumbs.flat(2); // or Infinity
  }
};
</script>