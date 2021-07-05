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
    methods: {
    addSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
    }
  },
  head() {
    let website = `https://aagam.jainism.info`;

    return {
      title: "Jain Aagam",
      titleTemplate: `%s | Jain Aagam literature books`,
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
        }
      ],
      link: [
        // https://csswizardry.com/2020/05/the-fastest-google-fonts/
        {
          rel: "preload",
          as: "style",
          href:
            "https://fonts.googleapis.com/css2?family=Vesper+Libre:wght@400;500;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Vesper+Libre:wght@400;500;700&family=Quicksand:wght@300;400;500;600;700&display=swap",
          media: "print",
          onload: "this.media='all'"
        },
        {
          rel: "canonical",
          href: this.addSlash(`${website}${this.$route.path}`)
        }
      ]
    };
  }
};
</script>

<style lang="sass">
::selection
  @apply tw-bg-yellow-100 tw-text-black
body
  .a11y-hide
    clip-path: inset(100%)
    clip: rect(1px, 1px, 1px, 1px)
    height: 1px
    width: 1px
    @apply tw-overflow-hidden tw-absolute tw-whitespace-nowrap
  .custom-min-height
    min-height: calc(100vh - 3.5rem)
</style>