<i18n lang="yaml">
  en:
    wip:
      h2: What is Jain Aagam project?
      para1: Jain Aagam project is an Open Source project by CA Manas Madrecha based in Mumbai to consolidate all the 45 Jain Aagam with their millions of aphormisms (sutra), along with meaning and explanation.
      para2: You are more than welcome to contribute to this voluminous Jain Aagam venture on Github 
      para3: Currently, there are Jain websites that serve only PDFs of Jain Aagam, but there is no website that provides searchable and indexable contents of Jain Aagam, that too in multiple languages. We aim to be the first. 
  hi:
    wip:
      h2: जैन आगम परियोजना क्या है?
      para1: जैन आगम परियोजना CA मानस मादरेचा (मुंबई में स्थित) द्वारा एक ओपन-सोर्स प्रोजेक्ट है, जिसमें सभी 45 जैन आगमों को उनके लाखों सूत्र के साथ अर्थ और स्पष्टीकरण सहित समेकित किया जाएगा।
      para2: Github पर इस विशाल जैन आगम उद्यम में योगदान करने के लिए आपका स्वागत है।
      para3: वर्तमान में, ऐसी जैन वेबसाइटें हैं जो केवल जैन आगम की PDF प्रस्तुत करती हैं, लेकिन ऐसी कोई वेबसाइट नहीं है जो जैन आगम की खोज योग्य और अनुक्रमित सामग्री प्रदान करती है, वह भी कई भाषाओं में। हम पहले बनने का लक्ष्य रखते हैं।
</i18n>

<template>
  <div>
    <section class="tw-mb-6 custom-min-height tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-pink-50">
      <div class="tw-max-w-screen-lg tw-mx-auto">
        <div class="tw-mx-4">
          <header class="tw-text-center tw-flex tw-flex-col tw-justify-evenly tw-gap-2">

            <p class="tw-inline-block tw-text-5xl md:tw-text-7xl tw-text-yellow-700">ꣽ</p>

            <h1 class="tw-mt-3 md:tw-mt-6 tw-text-5xl md:tw-text-7xl tw-font-medium tw-text-pink-700">{{$t("basic.jain_aagam")}}
            </h1>
            <p class="tw-mt-3 md:tw-mt-6 tw-text-xl md:tw-text-2xl tw-max-w-screen-md tw-mx-auto tw-leading-relaxed tw-text-gray-600 ">{{$t("pages.home.header.description")}}
            </p>
          </header>
          <div class="tw-mt-6 tw-flex tw-justify-center tw-items-center ">
            <nuxt-link
              :to="localePath(`/aagam`)"
              class="tw-inline-block tw-text-xl md:tw-text-2xl tw-py-4 tw-px-4 md:tw-px-6 tw-shadow-lg !tw-text-linkblue tw-border tw-border-blue-200 tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-blue-50 hover:tw-border-blue-600 hover:tw-bg-gradient-to-tl hover:tw-scale-105 md:hover:tw-scale-110 focus:tw-scale-100 hover:tw-shadow-xl tw-transform-gpu tw-transition-all tw-rounded tw-duration-150 tw-ease-in-out"
            >
              Read {{ $t("basic.jain_aagam") }} books online
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="tw-mb-6 tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-yellow-50">
      <div class="tw-max-w-screen-lg tw-mx-auto">
        <div class="tw-mx-4 tw-border-t tw-border-b tw-border-yellow-300 tw-px-2 tw-py-8 md:tw-px-4">
          <h2 class="tw-text-2xl tw-text-pink-900">{{$t("wip.h2")}}</h2>
          <div class="tw-text-lg tw-mt-3">
            <p class="tw-mt-3">{{$t("wip.para1")}}</p>
            <p class="tw-mt-3">{{$t("wip.para2")}}</p>
            <p class="tw-mt-3">
              <a
                href="https://github.com/jainism-portal/jainaagam"
                target="_blank"
                rel="noopener noreferrer"
                title="Jain Aagam Github repository"
              >
                <v-icon class="!tw-text-gray-600">mdi mdi-star</v-icon> <span class="tw-text-linkblue hover:tw-underline"> {{$t("basic.jain_aagam")}} Github</span>
                <v-icon small>mdi mdi-open-in-new</v-icon>
              </a>
            </p>
            <p class="tw-mt-3">{{$t("wip.para3")}} </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    addSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
    }
  },
  head() {
    let website = `https://aagam.jainism.info`;

    let defaultAlt = this.$route.path.startsWith("/hi")
      ? `${website}${this.$route.path.slice(3)}`
      : `${website}${this.$route.path}`;
    return {
      link: [
        {
          rel: "alternate",
          href: this.addSlash(defaultAlt),
          hreflang: "en"
        },
        {
          rel: "alternate",
          href: this.addSlash(defaultAlt),
          hreflang: "x-default"
        },
        {
          rel: "alternate",
          href: this.addSlash(
            this.$route.path.startsWith("/hi")
              ? `${website}${this.$route.path}`
              : `${website}/hi${this.$route.path}`
          ),
          hreflang: "hi"
        },
        {
          rel: "canonical",
          href: this.addSlash(`${website}${this.$route.path}`),
          hreflang: this.$i18n.locale
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.custom-min-height
  min-height: calc( 100vh - 64px )

@media (max-width: 640px)
  .custom-min-height
    min-height: calc( 70vh )
</style>