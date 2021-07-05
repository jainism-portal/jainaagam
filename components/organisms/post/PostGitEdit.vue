<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferer"
    class="tw-text-gray-300 tw-text-base hover:tw-underline"
  >
    Edit this page on Github <v-icon small>{{mdiOpenInNew}}</v-icon>
    <!-- <p>
      Contribute by translating Jain Aagam. Your contributions will help the international Jain community to better access Jain Aagam in multiple languages. For more details, you can <a
        href="mailto:madrechamanas@gmail.com"
        class="!tw-text-linkblue hover:tw-underline"
      >email CA Manas Madrecha</a>. Thank you. Jai Jinendra. 🙏🏻</p> -->
  </a>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";
export default {
  props: { metaPostDir: String },
  data() {
    return { mdiOpenInNew };
  },
  computed: {
    link() {
      const githubLink = `https://github.com/jainism-portal/jainaagam/tree/main/content-jainaagam`;

      return githubLink + `${this.metaPostDir}`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>