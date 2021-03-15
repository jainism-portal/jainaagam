<template>
  <div>
    <ol v-if="children.children">
      <li v-for="(child, i) in children.children" :key="child">
        <nuxt-link :to="`${fullPath}${children.type}-${i + 1}`">
          {{ child }}
        </nuxt-link>
      </li>
    </ol>
    <ol v-else>
      <li v-for="n in children.count" :key="n" class="tw-capitalize">
        <nuxt-link :to="`${fullPath}${children.type}-${n}`">
          {{ children.type }} {{ n }}
        </nuxt-link>
      </li>
    </ol>
  </div>
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