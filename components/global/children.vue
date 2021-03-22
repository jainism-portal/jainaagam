<template>
  <div>
    <ol v-if="children.children">
      <li v-for="(child, i) in children.children" :key="child">
        <nuxt-link :to="`${routePath}${children.type}-${i + 1}`">
          {{ child }}
        </nuxt-link>
      </li>
    </ol>
    <ol v-else>
      <li v-for="n in children.count" :key="n" class="tw-capitalize">
        <nuxt-link :to="`${routePath}${children.type}-${n}`">
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
      routePath: "",
    };
  },
  async fetch() {
    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;
  },
};
</script>

<style lang="postcss" scoped>
</style>