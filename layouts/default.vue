<template>
  <div>
    <TheHeader class="tw-h-[10vh]"></TheHeader>
    <Nuxt
      class="tw-max-w-6xl tw-mx-auto tw-py-4 content-area"
      keep-alive
      :keep-alive-props="{ max: 10 }"
    ></Nuxt>
    <TheFooter class="tw-h-[10vh]"></TheFooter>
  </div>
</template>

<style lang="postcss" scoped>
.content-area {
  /* min-height: calc(100vh - theme("height.32")); */
  min-height: calc(100vh - 10vh - 10vh);
}
</style>