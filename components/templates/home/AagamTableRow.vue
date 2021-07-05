<template>
  <tr class="hover:tw-bg-gray-50">
    <td class="tw-p-1 md:tw-p-2 tw-border">
      {{aagam.position}}
    </td>
    <td class="tw-p-1 md:tw-p-2 tw-border">
      <component
        :is="aagam.isLink ? 'nuxt-link' : 'span'"
        :to="aagam.isLink ? aagam.link : null"
        :class="aagam.isLink ? `!tw-text-linkblue tw-underline` : ``"
      >
        {{aagam.name}}
      </component>
      <span
        class="tw-inline-block tw-text-sm"
        v-if="aagam.sub"
      >({{aagam.sub}})</span>
    </td>
    <td class="tw-p-1 md:tw-p-2 tw-border">{{aagam.trans}}</td>
    <td class="tw-p-1 md:tw-p-2 tw-border">
      <component
        :is="aagam.isLink ? 'nuxt-link' : 'span'"
        :to="aagam.isLink ? `${aagam.link}/original` : null"
        :class="aagam.isLink ? `!tw-text-linkblue tw-underline` : ``"
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