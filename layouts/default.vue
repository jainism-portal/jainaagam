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
    <GoTop></GoTop>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    let template;
    if (this.$i18n.locale === "en") {
      template = `Jain Aagam books online`;
    }
    if (this.$i18n.locale === "hi") {
      template = `जैन आगम साहित्य ऑनलाइन`;
    }
    return {
      title: "Jain Aagam",
      titleTemplate: `%s | ${template}`,
      htmlAttrs: i18nHead.htmlAttrs,
      meta: [
        { hid: "robots", name: "robots", content: "index, follow" },
        { hid: `author`, name: `author`, content: `Manas Madrecha` }, // TODO: fetch contributors from Github
        {
          hid: `keywords`,
          name: `keywords`,
          content: `Jain Aagam, Jain books, Jainism literature`
        },
        {
          hid: "description",
          name: "description",
          content: `Jain Aagam explained with meaning and translation. Read Jain holy religious books online for free as Open source project by Manas Madrecha`
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `Jain Aagam books online`
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `Jain Aagam with meaning and translation. Jainism holy religious books. Open source project by Manas Madrecha`
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://avatars.githubusercontent.com/u/81185535"
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: "https://avatars.githubusercontent.com/u/81185535"
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "Jain Aagam books online"
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://avatars.githubusercontent.com/u/81185535"
        },
        ...i18nHead.meta
      ],
      link: [...i18nHead.link]
    };
  }
};
</script>