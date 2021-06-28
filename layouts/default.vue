<template>
  <v-app class="tw-text-base md:tw-text-xl">
    <!-- <ScrollIndicator class="tw-top-0"></ScrollIndicator> -->
    <TheHeader></TheHeader>
    <v-main class="!tw-min-h-screen">
      <Nuxt
        keep-alive
        :keep-alive-props="{ max: 10 }"
      ></Nuxt>
    </v-main>
    <TheFooter></TheFooter>
    <GoTop></GoTop>
  </v-app>
</template>

<script>
import TheHeader from "~/components/templates/TheHeader.vue";
import TheFooter from "~/components/templates/TheFooter.vue";
import GoTop from "~/components/molecules/GoTop.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    GoTop
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    let template;
    if (this.$i18n.locale === "en") {
      template = `Jain Aagam literature books`;
    }
    if (this.$i18n.locale === "hi") {
      template = `जैन आगम साहित्य पुस्तके`;
    }
    return {
      title: this.$t("basic.jain_aagam"),
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
      link: [
        // https://csswizardry.com/2020/05/the-fastest-google-fonts/
        {
          rel: "preload",
          as: "style",
          // href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          href:
            "https://fonts.googleapis.com/css2?family=Vesper+Libre:wght@400;500;700&family=Open+Sans:wght@300;400;600;700&display=swap"
        },
        {
          rel: "stylesheet",
          // href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap",
          href:
            "https://fonts.googleapis.com/css2?family=Vesper+Libre:wght@400;500;700&family=Open+Sans:wght@300;400;600;700&display=swap",
          media: "print",
          onload: "this.media='all'"
        }
        // ...i18nHead.link // Commented because it doesn't add slash
      ]
    };
  }
};
</script>