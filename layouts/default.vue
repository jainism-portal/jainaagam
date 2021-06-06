<template>
  <v-app class="tw-text-base md:tw-text-lg">
    <!-- <ScrollIndicator class="tw-top-0"></ScrollIndicator> -->
    <the-header></the-header>
    <v-main class="!tw-min-h-screen">
      <Nuxt
        keep-alive
        :keep-alive-props="{ max: 10 }"
      ></Nuxt>
    </v-main>
    <the-footer></the-footer>
  </v-app>
</template>