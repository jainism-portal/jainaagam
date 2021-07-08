<template>
  <v-app>
    <!-- <ScrollIndicator class="tw-top-0"></ScrollIndicator> -->
    <TheHeader></TheHeader>
    <v-main class="!tw-min-h-screen">
      <Nuxt
        keep-alive
        :keep-alive-props="{ max: 10 }"
      ></Nuxt>
    </v-main>
    <TheFooter></TheFooter>
    <GoTop v-if="showGoTop"></GoTop>
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
  data() {
    return {
      showGoTop: false
    };
  },
  methods: {
    addSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
    },
    showGoTopMethod() {
      this.showGoTop = window.pageYOffset > 800;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.showGoTopMethod);
  },
  destroyed() {
    window.removeEventListener("scroll", this.showGoTopMethod);
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

<style lang="sass" scoped>
.page-enter-active, .page-leave-active
  @apply tw-transition-all tw-duration-300 tw-opacity-100
.page-enter, .page-leave-to
  @apply tw-opacity-0
</style>
