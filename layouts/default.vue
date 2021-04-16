<template>
  <v-app>
    <div class="">
      <!-- <v-header></v-header> -->
      <ScrollIndicator class="tw-top-0"></ScrollIndicator>
      <TheHeader class="tw-h-[10vh]"></TheHeader>

      <v-main>

        <Nuxt
          class=""
          keep-alive
          :keep-alive-props="{ max: 10 }"
        ></Nuxt>
      </v-main>
      <v-footer>

        <TheFooter class="tw-h-[10vh]"></TheFooter>
      </v-footer>
    </div>
  </v-app>
</template>

<style lang="postcss" scoped>
.content-area {
  /* min-height: calc(100vh - theme("height.32")); */
  min-height: calc(100vh - 10vh - 10vh);
  @apply tw-bg-white;
}
</style>