<template>
  <div>
    hello
    <img :src="src" :alt="src" />
  </div>
</template>

<script>
export default {
  props: { src: String },
  data() {
    return {};
  },
};
</script>

<style lang="postcss" scoped>
</style>