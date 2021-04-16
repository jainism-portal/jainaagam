<template>
  <footer class="tw-my-2 md:tw-flex">
    <section class="tw-flex tw-justify-center tw-items-start">
      <p>&copy; {{ $t("name") }} {{ $t("surname") }} - 2020 - {{new Date().getFullYear()}}</p>
      <a
        href="https://instagram.com/ManasMadrecha"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="mdi mdi-instagram tw-text-pink-800 tw-text-xl"></span>
      </a>
      <a
        href="https://www.linkedin.com/in/manasmadrecha/"
        target="_blank"
        rel="noopener noreferrer"
        class="tw-inline-block"
      >
        <span class="mdi mdi-linkedin tw-text-blue-800 tw-text-xl"></span>
      </a>
    </section>
    <section class="tw-mx-2">
      <p>This is a Work-in-Progress project. Your contributions are most welcome.</p>
    </section>
  </footer>
</template>

<script>
export default {
  //   <i18n src="~/locales/hi-in.js"></i18n>
  // <i18n lang="yaml">
  // en:
  //   abc: hukh
  // hi:
  //   abc: हजग
  // </i18n>
};
</script>

<style lang="postcss" scoped>
</style>