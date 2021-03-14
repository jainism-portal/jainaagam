<template>
  <div>
    <TheHeader></TheHeader>
    <Nuxt
      class="tw-mx-auto tw-py-4 tw-max-w-4xl"
      keep-alive
      :keep-alive-props="{ max: 10 }"
    ></Nuxt>
    <TheFooter></TheFooter>
  </div>
</template>