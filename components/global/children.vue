<template>
  <ol>
    <li v-for="n in children.count" :key="n" class="tw-capitalize">
      <nuxt-link :to="`${fullPath}${children.type}-${n}`">
        {{ children.type }} {{ n }}
      </nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  props: { children: Object },
  data() {
    return {
      fullPath: "",
    };
  },
  async fetch() {
    this.fullPath = this.$route.fullPath.endsWith("/")
      ? this.$route.fullPath
      : `${this.$route.fullPath}/`;
  },
};
</script>

<style lang="postcss" scoped>
</style>