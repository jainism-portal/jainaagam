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
            <button
              @click="$vuetify.goTo('#aagam-list', {offset: 0})"
              class="tw-inline-block tw-text-xl md:tw-text-2xl tw-py-4 tw-px-4 md:tw-px-6 tw-shadow-lg !tw-text-linkblue tw-border tw-border-blue-200 tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-blue-50 hover:tw-border-blue-600 hover:tw-bg-gradient-to-tl hover:tw-scale-105 md:hover:tw-scale-110 focus:tw-scale-100 hover:tw-shadow-xl tw-transform-gpu tw-transition-all tw-rounded tw-duration-150 tw-ease-in-out"
            >
              Read {{ $t("basic.jain_aagam") }} books online
            </button>
          </div>
        </div>
    </section>

    <section id="aagam-list">
      <h2 class="tw-my-3 md:tw-my-6 tw-text-center tw-px-2 md:tw-px-4 tw-py-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-br tw-from-white tw-to-blue-50">List of 45 Jain Aagam</h2>
      <div class=" tw-mx-2">
        <p class="tw-text-base tw-text-center tw-text-gray-500">Currently, Acharanga and Sutrakritanga sutra are being actively worked upon.</p>
        <div class="tw-overflow-x-auto">
          <AagamTable></AagamTable>
        </div>
      </div>
    </section>

    <section class="tw-mb-6 tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-yellow-50">
      <div class="tw-max-w-screen-lg tw-mx-auto">
        <div class="tw-px-2 tw-py-8 md:tw-px-4">
          <h2 class="tw-my-3 md:tw-my-6 tw-text-3xl md:tw-text-4xl tw-text-pink-900">What is Jain Aagam project?</h2>
          <v-tabs
            show-arrows
            :slider-size="1"
          >
            <v-tab
              data-tab
              active-class="tw-bg-gradient-to-t tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
            >
              <span class="tw-capitalize tw-text-lg">English</span>
            </v-tab>
            <v-tab
              data-tab
              active-class="tw-bg-gradient-to-t tw-from-white tw-via-white tw-to-yellow-50 !tw-text-yellow-900"
            >
              <span class="tw-capitalize tw-text-lg">Hindi</span>
            </v-tab>
            <v-tabs-slider class="tw-bg-gradient-to-br tw-from-white tw-to-yellow-400"></v-tabs-slider>
            <v-tab-item
              lang="en"
              class="tw-mt-3 tw-text-gray-600 tw-px-4 tw-py-2"
              eager
            >
              <div class="tw-text-lg tw-mt-3">
                <p class="tw-mt-3">Jain Aagam project is an Open Source project by <a
                    href="https://manas.madrecha.com"
                    target="_blank"
                    rel="noopener"
                    class="!tw-text-linkblue hover:tw-underline"
                  >CA Manas Madrecha</a>
                  <v-icon small>{{mdiOpenInNew}}</v-icon>
                  based in Mumbai to consolidate all the 45 Jain Aagam with their millions of aphormisms (sutra), along with meaning and explanation.
                </p>

                <p class="tw-mt-3">You are more than welcome to contribute to this voluminous Jain Aagam venture on Github </p>
                <p class="tw-mt-3">
                  <a
                    href="https://github.com/jainism-portal/jainaagam"
                    target="_blank"
                    rel="noopener"
                    title="Jain Aagam Github repository"
                  >
                    <v-icon class="!tw-text-gray-600">{{mdiStar}}</v-icon> <span class="tw-text-linkblue hover:tw-underline"> Jain Aagam Github</span>
                    <v-icon small>{{mdiOpenInNew}}</v-icon>
                  </a>
                </p>
                <p class="tw-mt-3">Currently, there are Jain websites that serve only PDFs of Jain Aagam, but there is no website that provides searchable and indexable contents of Jain Aagam, that too in multiple languages. We aim to be the first.</p>
              </div>

            </v-tab-item>
            <v-tab-item
              lang="hi"
              class="tw-mt-3 tw-text-gray-600 tw-px-4 tw-py-2"
              eager
            >
              <div class="tw-text-lg tw-mt-3">
                <p class="tw-mt-3">जैन आगम परियोजना <a
                    href="https://manas.madrecha.com"
                    target="_blank"
                    rel="noopener"
                    class="!tw-text-linkblue hover:tw-underline"
                  >CA मानस मादरेचा</a>
                  <v-icon small>{{mdiOpenInNew}}</v-icon> (मुंबई में स्थित) द्वारा एक ओपन-सोर्स प्रोजेक्ट है, जिसमें सभी 45 जैन आगमों को उनके लाखों सूत्र के साथ अर्थ और स्पष्टीकरण सहित समेकित किया जाएगा।
                </p>
                <p class="tw-mt-3">Github पर इस विशाल जैन आगम उद्यम में योगदान करने के लिए आपका स्वागत है।</p>

                <p class="tw-mt-3">
                  <a
                    href="https://github.com/jainism-portal/jainaagam"
                    target="_blank"
                    rel="noopener"
                    title="Jain Aagam Github repository"
                  >
                    <v-icon class="!tw-text-gray-600">{{mdiStar}}</v-icon> <span class="tw-text-linkblue hover:tw-underline">जैन आगम Github</span>
                    <v-icon small>{{mdiOpenInNew}}</v-icon>
                  </a>
                </p>
                <p class="tw-mt-3">वर्तमान में, ऐसी जैन वेबसाइटें हैं जो केवल जैन आगम की PDF प्रस्तुत करती हैं, लेकिन ऐसी कोई वेबसाइट नहीं है जो जैन आगम की खोज योग्य और अनुक्रमित सामग्री प्रदान करती है, वह भी कई भाषाओं में। हम पहले बनने का लक्ष्य रखते हैं।</p>
              </div>

            </v-tab-item>
          </v-tabs>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mdiStar, mdiOpenInNew } from "@mdi/js";

import AagamTable from "~/components/templates/home/AagamTable.vue";

export default {
  name: "HomePage",
  components: { AagamTable },
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
.custom-min-height
  min-height: calc( 100vh - 64px )

@media (max-width: 640px)
  .custom-min-height
    min-height: 70vh
</style>

<style lang="sass" src="~/assets/css/nuxtcontent.sass" scoped>

</style>