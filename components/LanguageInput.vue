<template>
  <div>
    <!-- <select v-model="$i18n.locale">
      <option v-for="lang in $i18n.locales" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select> -->

    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="tw-inline-block tw-p-1"
    >
      <v-icon class="!tw-text-gray-600">{{mdiTranslate}}</v-icon> Read in {{locale.name }}
    </nuxt-link>
  </div>
</template>

<script>
import { mdiTranslate } from "@mdi/js";

export default {
  data() {
    return {
      mdiTranslate
    };
  },
  computed: {
    availableLocales() {
      // return this.$i18n.locales;
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  }
};
</script>