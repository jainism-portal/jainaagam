<template>
  <v-footer
    app
    v-once
    absolute
    class="tw-bg-gradient-to-b tw-from-white tw-to-blue-50 "
  >
    <div class="tw-w-full tw-border-t tw-border-blue-200 tw-px-4 tw-py-2">
      <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-evenly tw-gap-4 tw-text-center">
        <p class="tw-text-gray-700"> &copy; CA Manas Madrecha </p>
        <p class="tw-text-base tw-text-gray-800">
          &copy; 2020 - {{new Date().getFullYear()}}
        </p>
      </div>
    </div>
  </v-footer>
</template>