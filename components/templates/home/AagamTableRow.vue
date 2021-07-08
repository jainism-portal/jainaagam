<template>
  <tr class="tw-text-sm md:tw-text-xl">
    <td class="tw-border">
      {{aagam.position}}
    </td>
    <td class="tw-border">
      <component
        :is="aagam.isLink ? 'nuxt-link' : 'span'"
        :to="aagam.isLink ? aagam.link : null"
      >
        {{aagam.name}}
      </component>
      <span
        class="tw-inline-block tw-text-xs md:tw-text-sm"
        v-if="aagam.sub"
      >({{aagam.sub}})</span>
    </td>
    <td class="tw-border">{{aagam.trans}}</td>
    <td class="tw-border">
      <component
        :is="aagam.isLink ? 'nuxt-link' : 'span'"
        :to="aagam.isLink ? `${aagam.link}/original` : null"
        lang="pka"
      >
        {{aagam.original}}
      </component>
    </td>
  </tr>
</template>

<script>
export default {
  props: { aagam: Object },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>