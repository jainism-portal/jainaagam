<template>
  <center class="tw-border-gray-400 tw-border tw-py-1">
    <!-- <iframe :src="pdf" class="tw-w-full tw-h-[70vh]"
      >No iframe support by browser.</iframe
    > -->
    <a
      :href="`/pdf${pdf}`"
      target="_blank"
    >Download PDF {{ pdf }}</a>

    <button
      class="button-blue"
      @click.prevent="showPdf = !showPdf"
    >
      Click to view here
    </button>

    <div v-if="pdf && showPdf">
      <vue-pdf-app
        style="height: 100vh"
        :pdf="`/pdf${pdf}`"
        :title="true"
      ></vue-pdf-app>
    </div>
    <!-- <div v-if="showPdf">
      {{ currentPage }} / {{ pageCount }}
      <pdfabc
        src="/modi.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
      ></pdfabc>
    </div> -->
  </center>
</template>

<script>
// if (process.client) {
//   // import { pdf as pdfabc } from "vue-pdf";
//   let pdfabc = require("vue-pdf");
//   console.log(pdfabc);
// }

// import "~/assets/css/utils.sass";

export default {
  props: { pdf: { type: String }, h: { type: String, default: "tw-h-[80vh]" } },
  // components: {
  // pdfabc: process.client && import("vue-pdf"),
  // pdfabc: () => import("vue-pdf"),
  // pdfbeautiful: () => (process.client ? import("vue-pdf-app") : ""),
  // VuePdfApp: () => import("vue-pdf-app"),
  // pdfbeautiful: () => (process.client ? window("vue-pdf-app") : ""),
  // },
  data() {
    return {
      showPdf: false
    };
  },
  methods: {}
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/utils.sass'
</style>