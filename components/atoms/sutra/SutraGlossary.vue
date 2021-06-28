<template>
  <section
    class="nuxt-content"
    v-if="$scopedSlots.default"
  >
    <h2 class="tw-capitalize">{{$t("basic.jain_aagam")}} {{$t("pages.sutra.main.glossary")}}</h2>
    <div>
      <slot></slot>
    </div>
  </section>
</template>

<style lang="sass"src="~/assets/css/all.sass" scoped>
</style>