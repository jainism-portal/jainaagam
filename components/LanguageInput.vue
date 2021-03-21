<template>
  <div class="lang-dropdown">
    <select v-model="$i18n.locale">
      <option v-for="lang in $i18n.locales" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link
    >
  </div>
</template>
<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales;
      // return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>