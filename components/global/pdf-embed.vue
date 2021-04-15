<template>
  <center class="tw-border-gray-300 tw-border tw-py-1">
    <iframe
      :src="pdf"
      class="tw-w-full tw-h-96"
      No
      iframe
      support
      by
      browser.
    ></iframe>
    <a :href="pdf" target="_blank">Download PDF</a>
  </center>
</template>

<script>
export default {
  props: { pdf: { type: String } },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>