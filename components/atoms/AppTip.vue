<template>
  <div
    class="custom-tip tw-my-3 tw-px-6 tw-pt-1 tw-pb-4"
    style="border-left-width: 6px"
    :class="colorComputed"
  >
    <!-- <p class="tw-font-medium tw-my-2" v-html="title ? title : `Tip`"></p> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppTip",
  props: {
    color: { type: String },
    colour: { type: String },
    title: String
  },
  data() {
    return {};
  },
  computed: {
    colorComputed() {
      // if (
      //   (this.color == null || this.color == undefined) &&
      //   (this.colour == null || this.colour == undefined)
      // ) {
      //   return [`tw-bg-gray-50`, `tw-text-gray-800`, `tw-border-gray-500`];
      // } else {
      let c = this.color ? this.color : this.colour ? this.colour : "gray";

      let isColor =
        c === "gray" ||
        c === "red" ||
        c === "yellow" ||
        c === "green" ||
        c === "blue" ||
        c === "indigo" ||
        c === "purple" ||
        c === "pink" ||
        c === "white";

      let errorMsg = `You have typed wrong color for "tip". Choose only gray, red, yellow, green, blue, indigo, purple, pink or white.`;

      if (isColor) {
        return [`tw-bg-${c}-50`, `tw-text-${c}-800`, `tw-border-${c}-500`];
      } else {
        console.error(errorMsg);
      }
      // }
    }
  }
};
</script>