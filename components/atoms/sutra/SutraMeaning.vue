<template>
  <section
    class="nuxt-content"
    v-if="$scopedSlots.default"
  >
    <h2 class="tw-capitalize">Jain Sutra meaning</h2>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="sass"src="~/assets/css/all.sass" scoped>
</style>