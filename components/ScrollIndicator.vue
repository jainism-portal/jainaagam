<template>
  <div
    class="tw-w-full tw-h-2 tw-bg-gray-200 tw-sticky tw-z-30 tw-flex tw-justify-between"
  >
    <div id="myBar" class="tw-h-2 tw-bg-pink-700" style="width: 0%"></div>
    <small v-if="scrolled" class="tw-text-xs" style="margin-top: -0.2rem">{{
      scrolled.toFixed(2)
    }}</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrolled: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollIndicator);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollIndicator);
  },
  methods: {
    scrollIndicator() {
      let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      //   console.log(`Winscroll hai --> ${winScroll}`);
      let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      //   console.log(`Height hai --> ${height}`);
      this.scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = this.scrolled + "%";
    },
  },
};
</script>