<template>
  <div>
    <section class="tw-py-6 tw-min-h-[calc(100vh-4rem)] tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-pink-50">
      <div class="tw-container tw-mx-auto tw-px-4">

        <div class="tw-text-center tw-flex tw-flex-col tw-justify-evenly tw-gap-2 md:tw-gap-4">
          <header>
            <p class="tw-group tw-relative">
              <span class="tw-inline-block tw-max-w-max tw-text-5xl md:tw-text-7xl tw-text-yellow-700">ꣽ</span>
              <span class="tw-absolute tw-top-0 tw-scale-0 group-hover:tw-scale-100 tw-transform-gpu tw-transition-all tw-text-yellow-600">Jain Om</span>
            </p>

            <h1 class="tw-mb-0 tw-py-2 tw-text-5xl md:tw-text-8xl tw-font-medium tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-br tw-from-pink-500 tw-to-pink-800">Jain Aagam</h1>
          </header>

          <p class="tw-text-lg md:tw-text-2xl tw-max-w-prose tw-mx-auto">Jain Aagam are Jainism's supreme religious scriptures that deal with metaphysics, liberation of soul, and spiritual advice on how to lead a non-violent life.
          </p>

        </div>
        <div class="tw-mb-3 md:tw-mb-6 tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-2 md:tw-gap-4">
          <GirlBookSvg class="tw-w-64 tw-h-auto"></GirlBookSvg>
          <button
            @click="$vuetify.goTo('#aagam-list', {offset: 0})"
            class="tw-text-lg md:tw-text-2xl tw-px-2 tw-py-4 md:tw-px-6 tw-shadow-lg tw-text-linkblue tw-rounded-xl tw-border-blue-200 tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-blue-50 hover:tw-border-blue-600 hover:tw-bg-gradient-to-tl hover:tw-shadow-xl focus:tw-outline-none"
          >
            Read Jain Aagam books online
          </button>
        </div>
      </div>
    </section>

    <section id="aagam-list">
      <h2 class="nuxt-content-h1">List of 45 Jain Aagam</h2>
      <div class="tw-container tw-mx-auto tw-px-4">
        <p class="tip-pink tw-text-base md:tw-text-lg tw-text-gray-700">Currently, Acharanga and Sutrakritanga sutra are being actively worked upon by me.</p>
        <div class="tw-overflow-x-auto">
          <AagamTable></AagamTable>
        </div>
      </div>
    </section>

    <section class="tw-mb-6">
      <h2 class="nuxt-content-h1">What is Jain Aagam project?</h2>
      <div class="tw-container tw-mx-auto tw-px-4">
        <v-tabs
          show-arrows
          :slider-size="1"
          grow
        >
          <v-tab
            data-tab
            class="tw-text-lg md:tw-text-2xl"
            active-class="tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
          >
            English
          </v-tab>
          <v-tab
            class="tw-text-lg md:tw-text-2xl"
            active-class="tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
          >
            Hindi
          </v-tab>
          <v-tabs-slider class="tw-bg-gradient-to-br tw-from-white tw-to-yellow-400"></v-tabs-slider>
          <v-tab-item
            lang="en"
            class="tw-p-4"
            eager
          >
            <p>Jain Aagam project is an Open Source project by <a
                href="https://manas.madrecha.com"
                target="_blank"
                rel="noopener"
              >CA Manas Madrecha
                <v-icon small>{{mdiOpenInNew}}</v-icon>
              </a>
              based in Mumbai to consolidate all the 45 Jain Aagam with their millions of aphormisms (sutra), along with meaning and explanation.
            </p>

            <p>You are more than welcome to contribute to this voluminous Jain Aagam venture on Github </p>

            <p>
              <v-icon>{{mdiStar}}</v-icon>
              <a
                href="https://github.com/jainism-portal/jainaagam"
                target="_blank"
                rel="noopener"
                title="Jain Aagam Github repository"
              >
                Jain Aagam Github
                <v-icon small>{{mdiOpenInNew}}</v-icon>
              </a>
            </p>

            <p>Currently, there are Jain websites that serve only PDFs of Jain Aagam, but there is no website that provides searchable and indexable contents of Jain Aagam, that too in multiple languages. We aim to be the first.</p>

          </v-tab-item>
          <v-tab-item
            lang="hi"
            class="tw-p-4"
            eager
          >
            <p>जैन आगम परियोजना <a
                href="https://manas.madrecha.com"
                target="_blank"
                rel="noopener"
              >CA मानस मादरेचा
                <v-icon small>{{mdiOpenInNew}}</v-icon>
              </a>
              (मुंबई में स्थित) द्वारा एक ओपन-सोर्स प्रोजेक्ट है, जिसमें सभी 45 जैन आगमों को उनके लाखों सूत्र के साथ अर्थ और स्पष्टीकरण सहित समेकित किया जाएगा।
            </p>

            <p>Github पर इस विशाल जैन आगम उद्यम में योगदान करने के लिए आपका स्वागत है।</p>

            <p>
              <v-icon>{{mdiStar}}</v-icon>
              <a
                href="https://github.com/jainism-portal/jainaagam"
                target="_blank"
                rel="noopener"
                title="Jain Aagam Github repository"
              > जैन आगम GitHub
                <v-icon small>{{mdiOpenInNew}}</v-icon>
              </a>
            </p>

            <p>वर्तमान में, ऐसी जैन वेबसाइटें हैं जो केवल जैन आगम की PDF प्रस्तुत करती हैं, लेकिन ऐसी कोई वेबसाइट नहीं है जो जैन आगम की खोज योग्य और अनुक्रमित सामग्री प्रदान करती है, वह भी कई भाषाओं में। हम पहले बनने का लक्ष्य रखते हैं।</p>
          </v-tab-item>
        </v-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import { mdiStar, mdiOpenInNew } from "@mdi/js";

import GirlBookSvg from "~/assets/illustrations/girl-book.svg?inline";

import AagamTable from "~/components/templates/home/AagamTable.vue";

export default {
  name: "HomePage",
  components: { AagamTable, GirlBookSvg },
  data() {
    return {
      mdiStar,
      mdiOpenInNew
    };
  },

  head() {
    return {};
  }
};
</script>

<style lang="sass" scoped>
// To override vuetify para
p
  @apply tw-my-3 md:tw-my-6
</style>