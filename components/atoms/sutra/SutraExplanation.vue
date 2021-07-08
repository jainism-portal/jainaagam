<template>
  <section v-if="$scopedSlots.default">
    <h2 class="nuxt-content-h2">Explanation</h2>
    <div>
      <slot></slot>
    </div>
  </section>
</template>