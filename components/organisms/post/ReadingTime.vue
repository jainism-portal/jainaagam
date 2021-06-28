<template>
  <div class="tw-inline tw-font-bold tw-text-green-800">
    <span v-if="showTime">{{
      (time * 1.2).toFixed(0)
    }} min </span>
    <span v-if="showWords">- {{(time * 200).toFixed(0)}} words </span>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    showWords: { type: Boolean, default: false },
    showTime: { type: Boolean, default: true }
  },
  computed: {
    time() {
      return +this.post.readingTime / 60 / 1000;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>