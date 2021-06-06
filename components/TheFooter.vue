<template>
  <!-- <i18n src="~/locales/hi-in.js"></i18n>
  <i18n lang="yaml">
  en:
    abc: hukh
  hi:
    abc: हजग
  </i18n> -->
  <v-footer
    app
    absolute
    class="tw-bg-gradient-to-b tw-from-white tw-to-blue-50 "
  >
    <div class="tw-w-full tw-border-t tw-border-blue-200 tw-px-4 tw-py-2">
      <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-evenly tw-gap-4 tw-text-center">
        <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-3">
          <span class="tw-text-base tw-text-gray-500">Design & Content:</span>
          <span class="tw-text-gray-900">&copy; CA {{ $t("name") }} {{ $t("surname") }}</span>
        </div>
        <div class="tw-text-base tw-text-gray-800">
          &copy; 2020 - {{new Date().getFullYear()}}
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script>
import { mdiGithub } from "@mdi/js";

export default {
  data() {
    return {
      mdiGithub
    };
  }
};
</script>

<style lang="sass" scoped>
</style>