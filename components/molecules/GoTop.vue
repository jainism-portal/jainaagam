<template>
  <button
    @click="$vuetify.goTo(0)"
    v-ripple
    class="tw-fixed tw-bottom-16 tw-right-1 tw-z-40 tw-rounded-2xl tw-text-2xl tw-w-10 tw-h-10 lg:tw-w-12 lg:tw-h-12 tw-font-2xl tw-bg-gradient-to-bl tw-from-white tw-to-pink-200 tw-shadow-md focus:tw-outline-none"
  >
    <v-icon class="!tw-text-pink-800"> {{mdiArrowUp}} </v-icon>
  </button>
</template>

<script>
import { mdiArrowUp } from "@mdi/js";
export default {
  data() {
    return {
      mdiArrowUp
    };
  }
};
</script>