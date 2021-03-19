<template>
  <div
    class="tw-my-3 tw-px-6 tw-pt-1 tw-pb-4"
    style="border-left-width: 6px"
    :class="
      color
        ? [
            `tw-text-${color}-800`,
            `tw-bg-${color}-50`,
            `tw-border-${color}-500`,
          ]
        : ['tw-text-gray-800', 'tw-bg-gray-50', 'tw-border-gray-500']
    "
  >
    <p class="tw-text-lg tw-font-medium" v-html="title ? title : `Tip`"></p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tip",
  props: { color: String, title: String },
  data() {
    return {};
  },
};
</script>