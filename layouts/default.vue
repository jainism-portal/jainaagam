<template>
  <div>
    <!-- <TheHeader></TheHeader> -->
    <Nuxt
      class="tw-mx-2 tw-py-4"
      keep-alive
      :keep-alive-props="{ max: 10 }"
    ></Nuxt>
    <!-- <TheFooter></TheFooter> -->
  </div>
</template>