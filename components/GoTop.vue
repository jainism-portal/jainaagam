<template>
  <button
    @click="GoUp()"
    class="tw-fixed tw-z-40 tw-bottom-16 tw-right-2 tw-rounded-2xl tw-text-2xl tw-w-10 tw-h-10 lg:tw-w-12 lg:tw-h-12 tw-font-2xl tw-bg-gradient-to-bl tw-from-white tw-to-pink-200 tw-shadow-md focus:tw-outline-none focus:tw-ring focus:tw-ring-pink-300"
  >
    👆🏻
    <!-- <fa-icon icon="arrow-up" class="tw-text-pink-800"></fa-icon> -->
  </button>
</template>

<script>
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// library.add(faArrowUp);

export default {
  data() {
    return {
      // onTop: false,
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // handleScroll() {
    //   this.onTop = window.pageYOffset > 200;
    // },
    GoUp() {
      if (window.screen.width < 786) {
        document.body.scrollTop = 5;
        document.documentElement.scrollTop = 5;
      } else {
        document.body.scrollTop = 5;
        document.documentElement.scrollTop = 5;
      }
    }
  }
};
</script>