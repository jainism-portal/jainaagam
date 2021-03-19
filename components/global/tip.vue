<template>
  <div
    class="tw-my-3 tw-px-6 tw-pt-1 tw-pb-4"
    style="border-left-width: 6px"
    :class="[
      `tw-text-${color}-800`,
      `tw-bg-${color}-50`,
      `tw-border-${color}-500`,
    ]"
  >
    <p
      class="tw-pt-2 tw-pb-2 tw-text-lg tw-font-medium"
      v-html="title ? title : `Tip`"
    ></p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tip",
  props: { color: { type: String, default: "gray" }, title: String },
  data() {
    return {};
  },
};
</script>