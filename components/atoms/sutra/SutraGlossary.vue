<template>
  <section v-if="$scopedSlots.default">
    <details
      :open="open ? true : false"
      class="details"
    >
      <summary>
        <h2 class="tw-my-0 !tw-inline !tw-text-lg md:!tw-text-xl !tw-text-gray-800 !tw-font-normal !tw-border-none">Glossary</h2>
      </summary>
      <slot></slot>
    </details>
  </section>
</template>

<script>
export default {
  props: { open: Boolean, default: false }
};
</script>

<style lang="sass" scoped>
// dl
//   // @apply tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-4 tw-items-start
//   // counter-reset: def
//   > div
//     @apply tw-border-b tw-border-gray-300 tw-p-2 last:tw-border-b-0
//     dt
//       @apply tw-text-yellow-800
//       @apply tw-inline
//       // &::before
//       //   content: counter(def) "."" "
//       //   counter-increment: def

//     dd
//       // @apply tw-ml-8
//       @apply tw-text-sm md:tw-text-base first-of-type:tw-inline first-of-type:tw-text-lg md:first-of-type:tw-text-xl
//       &::before
//         content: "• "
//         @apply tw-text-pink-800
//       &:first-of-type
//         &::before
//           content: "→ "
//           @apply tw-text-pink-800
</style>

<style lang="sass" scoped>
details[open][class="details"]
  summary
    @apply tw-mb-3 md:tw-mb-6
dl
  dt
    @apply tw-text-yellow-800
    @apply tw-inline
    &::after
      content: ", "
    // &:first-of-type
    //   &::after
    //     content: ""
  dd + dt
    &::after
      content: ""
  dd
    @apply tw-text-sm md:tw-text-base
    @apply tw-mb-3 md:tw-mb-6
  dt + dd
    @apply tw-inline tw-text-lg md:tw-text-xl tw-border-none
    @apply tw-mb-0
    &::before
      content: " → "
      @apply tw-text-pink-800
    &::after
      content: ""
      @apply tw-block
      @apply tw-mb-3 md:tw-mb-6
  dt ~ dd
    @apply tw--mt-3 md:tw--mt-6

</style>