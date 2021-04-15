<template>
  <div
    class="tw-my-3 tw-p-2 tw-border tw-border-gray-400 tw-cursor-pointer"
    @click="showAlert"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: { msg: { type: String, default: "Hello alert" } },
  data() {
    return {};
  },
  methods: {
    showAlert() {
      this.$swal(this.msg);
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>