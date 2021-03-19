<template>
  <div
    class="custom-tip tw-my-3 tw-px-6 tw-pt-1 tw-pb-4"
    style="border-left-width: 6px"
    :class="[
      `tw-text-${colorComputed}-800`,
      `tw-bg-${colorComputed}-50`,
      `tw-border-${colorComputed}-500`,
    ]"
  >
    <!-- <p class="tw-font-medium tw-my-2" v-html="title ? title : `Tip`"></p> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tip",
  props: {
    color: { type: String },
    colour: { type: String },
    title: String,
  },
  data() {
    return {};
  },
  computed: {
    colorComputed() {
      if (
        (this.color == null || this.color == undefined) &&
        (this.colour == null || this.colour == undefined)
      ) {
        return `gray`;
      } else {
        let c = this.color ? this.color : this.colour;

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
          return c;
        } else {
          console.error(errorMsg);
        }
      }
    },
  },
};
</script>