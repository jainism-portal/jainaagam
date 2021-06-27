<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching... 💖 Wait for a few seconds 😊

    </div>
    <div
      v-else-if="$fetchState.error"
      class="nuxt-content tw-my-48 tw-text-xl tw-p-4"
    >
      <!-- (post === null && sutraOriginal === null) || -->
      <h1 class="tw-text-3xl tw-bg-pink-50 tw-text-center tw-text-blue-900 tw-font-medium tw-p-4">404 error. Page not found.</h1>
      <ol class="tw-mt-3">
        <li>Check URL again</li>
        <li>This page is not yet available in {{$i18n.localeProperties.name}} language. Choose different language. OR</li>
        <li>Go <nuxt-link
            :to="localePath(`/`)"
            class="tw-text-linkblue hover:tw-underline"
          >Home</nuxt-link> to navigate to the Aagam of your choice.
        </li>
      </ol>
    </div>
    <div v-else>
      <Breadcrumbs
        v-if="$route.path"
        :path="$route.path.endsWith(`/`) ? $route.path : `${$route.path}/`"
      >
      </Breadcrumbs>
      <!-- <button
              class="tw-fixed tw-z-40 tw-bottom-4 md:tw-bottom-auto md:tw-top-14 tw-right-2 tw-rounded-2xl tw-text-2xl tw-w-10 tw-h-10 md:tw-w-12 md:tw-h-12 tw-font-2xl tw-bg-gradient-to-bl tw-from-white tw-to-blue-200 tw-shadow-md focus:tw-outline-none focus:tw-ring focus:tw-ring-blue-300"
              @click.stop="showToc = !showToc"
            >{{ showToc ? "❌" : "🧾" }}</button> -->
      <article :class="showToc ? 'md:tw-w-[70%]' : 'tw-w-full'">
        <h1
          v-if="
          !post ||
          (!post && !sutraOriginal)
        "
          class="tw-text-center tw-px-2 md:tw-px-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-r tw-from-white tw-to-blue-50 tw-p-2"
        >
          {{seoTitle}}

        </h1>
        <h1
          v-if="post"
          class="tw-text-center tw-px-2 md:tw-px-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-r tw-from-white tw-to-blue-50 tw-p-2"
        >
          {{seoTitle}}
          <span v-if="post.title">
            - {{ post.title }}</span>
        </h1>
        <h1
          v-if="!post && sutraOriginal"
          class="tw-text-center tw-px-2 md:tw-px-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-r tw-from-white tw-to-blue-50 tw-p-2"
        >
          {{seoTitle}}
          <span v-if="sutraOriginal.title">
            - {{ sutraOriginal.title }}</span>
        </h1>
        <div class="tw-flex tw-justify-center tw-items-center">
          <nuxt-link
            :to="localePath(`/${AagamName}/toc`)"
            class="tw-inline-block tw-text-center tw-text-base tw-mt-2 tw-px-3 tw-py-2 !tw-text-purple-700 tw-border tw-border-purple-200 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-rounded"
          >View
            <span class="tw-capitalize">{{AagamName}} </span>
            Aagam's
            <span>Table of Contents</span>
          </nuxt-link>
        </div>

        <div
          v-if="
          !post ||
          (!post && !sutraOriginal)"
          class="tw-border-t tw-border-gray-500 tw-m-4"
        >
          <Incomplete
            :post="post"
            :sutraOg="sutraOriginal"
          ></Incomplete>
        </div>

        <div
          v-else
          class="tw-my-4 tw-mx-4"
        >

          <section v-if="children && children.length > 0">
            <header class="nuxt-content ">
              <h2 class="tw-cursor-pointer">{{$t("pages.all.children.heading")}}</h2>
            </header>
            <component :is="  children.length > 10 ? 'details' : 'div'">
              <summary
                v-if="children.length > 10"
                class="tw-my-3 md:tw-my-6 tw-pl-2 md:tw-pl-4 tw-py-2 tw-cursor-pointer hover:tw-shadow-md tw-rounded hover:tw-bg-gradient-to-b hover:tw-from-white hover:tw-to-pink-50 tw-text-pink-800"
              >{{$t("pages.all.children.summary")}}</summary>
              <ol class="tw-list-decimal tw-list-inside">
                <li
                  v-for="child in children"
                  :key="child.path"
                >
                  <nuxt-link
                    :to="localePath(child.to)"
                    class="custom-first-letter-capitalize tw-inline-block tw-p-1 !tw-text-linkblue hover:tw-underline"
                  >
                    {{child.title ? translateSlug(child.slug).replace(/-/g, " ") + ' 👉🏻 ' + child.title : translateSlug(child.slug).replace(/-/g, " ")}}
                  </nuxt-link>
                  <!-- <ReadingTime class="tw-text-sm" :post="child" :showWords="true"   :showTime="false"></ReadingTime> -->
                </li>
              </ol>
            </component>
          </section>

          <nuxt-content
            v-if="post"
            :document="post"
            class="tw-mt-3"
          ></nuxt-content>
          <section
            v-if="sutraOriginal"
            class="nuxt-content"
          >
            <h2 class="">{{$t("pages.sutra.main.sutra.heading")}}</h2>
            <sutra :sutraOriginal="sutraOriginal"></sutra>
          </section>
          <section
            v-if="post.body.children.length == 0"
            class="nuxt-content tw-mt-3"
          >
            <h2>Contribute</h2>
            <p class="tw-bg-yellow-50 tw-p-3">😊 The page for this <span class="tw-capitalize tw-font-medium">{{post.type ? post.type : `post`}}</span> is yet to be added. You may check its <b>Contents</b>. </p>
            <p>This is an Open source project, so you too can easily <a
                :href="`https://github.com/madrecha/jainaagam/tree/main/content${post.path.endsWith(`/`) ? post.path.slice(0, -1) : post.path}${post.extension}`"
                target="_blank"
                class="!tw-text-linkblue hover:tw-underline"
              >
                Contribute by translating Jain Aagam</a>. Your contributions will help the international Jain community to better access Jain Aagam in multiple languages. For more details, you can <a
                href="mailto:madrechamanas@gmail.com"
                class="!tw-text-linkblue hover:tw-underline"
              >email CA Manas Madrecha</a>. Thank you. Jai Jinendra. 🙏🏻</p>
          </section>
        </div>
        <footer class="nuxt-content tw-m-4 tw-border-t tw-border-gray-600">
          <div class="tw-text-linkblue tw-mt-3 tw-flex tw-flex-col md:tw-flex-row tw-justify-around">
            <nuxt-link
              :to="localePath(prevs.to)"
              v-if="prevs"
              class="tw-mx-2 tw-text-center tw-capitalize"
            >Prev 👈🏻 {{prevs.slug}}</nuxt-link>
            <nuxt-link
              :to="localePath(nexts.to)"
              v-if="nexts"
              class="tw-mx-2 tw-text-center tw-capitalize"
            >Next 👉🏻 {{nexts.slug}}</nuxt-link>
          </div>

          <div class="tw-text-center tw-bg-green-50 tw-mt-3 tw-p-3">
            <a
              :href="`https://github.com/madrecha/jainaagam/tree/main/content${post.path.endsWith(`/`) ? post.path.slice(0, -1) : post.path}${post.extension}`"
              target="_blank"
              class="!tw-text-linkblue tw-block tw-text-sm"
              v-if="post"
            >
              Contribute/Edit on GitHub
            </a>
            <div class="tw-text-sm tw-text-gray-500">
              Post footer. Author. Comments. Related. Share.
            </div>
          </div>
        </footer>
      </article>
      <!-- <aside :class="showToc ? 'tw-w-[30%]' : 'md:tw-w-0'">
          <div class="tw-fixed md:tw-sticky tw-top-11 md:tw-top-0 tw-z-30 tw-rounded-2xl tw-shadow-md tw-bg-gradient-to-br tw-from-white tw-via-white tw-to-blue-50">
            <header
              id="heading-toc"
              @click.prevent="showToc = !showToc"
              class="tw-bg-blue-50 tw-text-blue-900 tw-py-3 tw-rounded-2xl tw-flex tw-justify-around tw-items-center tw-cursor-pointer"
              :class="showToc ? '' : 'tw-hidden'"
            >
              🧾
              <h2 class="tw-uppercase tw-font-medium tw-text-center tw-tracking-wider">
                Table of contents (TOC)
              </h2>
              <p>{{ showToc == true ? "👆🏻" : "👇🏻" }}</p>
            </header>
            <scrollactive
              active-class="active-scroll"
              :offset="60"
              :clickToScroll="true"
              :modifyUrl="false"
              tag="nav"
              v-show="showToc"
              class="nav_toc tw-overflow-y-scroll tw-h-[95vh]"
            >
              <ul
                v-if="post"
                id="toc-ul"
                class="tw-mt-2 tw-pl-5 tw-pr-1 md:tw-pl-8 md:tw-pr-4 tw-mb-16"
              >
                <li
                  v-for="heading in headings"
                  :key="heading.id"
                  class="tw-my-2 tw-mb-0"
                  :style="
                  heading.depth === 2
                    ? { 'text-indent': '-0.2rem' }
                    : heading.depth === 3
                    ? {
                        'text-indent': '-0.2rem',
                        'margin-left': '1.25rem',
                      }
                    : {
                        'text-indent': '-0.2rem',
                        'margin-left': '2.5rem',
                      }
                "
                >
                  <a
                    class="tw-rounded scrollactive-item"
                    :class="
                    heading.depth === 2
                      ? 'tw-text-pink-800 hover:tw-bg-red-50 tw-text-lg '
                      : heading.depth === 3
                      ? 'tw-text-blue-900  hover:tw-bg-blue-50'
                      : 'tw-text-green-700  hover:tw-bg-green-50'
                  "
                    :href="`#${heading.id}`"
                  >
                    {{ heading.text }}
                  </a>
                </li>
              </ul>
            </scrollactive>
          </div>
        </aside> -->
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import AagamTOC from "~/components/templates/AagamTOC.vue";
import AagamOriginal from "~/components/templates/AagamOriginal.vue";

import Sutra from "~/components/templates/Sutra.vue";

import SutraMeaning from "~/components/templates/SutraMeaning.vue";
import SutraExplanation from "~/components/templates/SutraExplanation.vue";

import startCase from "lodash.startcase";

export default {
  name: "AagamDynamicPage",
  components: {
    Breadcrumbs,
    "aagam-toc": AagamTOC,
    AagamOriginal,
    Sutra,
    SutraMeaning,
    SutraExplanation
  },
  data() {
    return {
      // POSTS
      posts: [],
      post: null,
      sutrasOriginals: [],
      sutraOriginal: null,

      // PATH
      ROUTE_PATH: "",
      ROUTE_PATH_WITH_SLASH: "",

      // CHILDREN
      children: null,

      // SIBLINGS
      prevs: null,
      nexts: null,

      // Reading Time
      totalTime: null,
      childrenReadingTimeTotal: null,
      childrenReadingWordsTotal: null,

      // Table of Contents active
      showToc: false,
      navtocheight: "",
      showFixedTOC: true,
      headings: []
    };
  },
  computed: {
    seoTitle() {
      if (this.$route?.params?.pathMatch) {
        let pathContents = `${startCase(this.$route.params.pathMatch)}`;

        pathContents = this.translateSlug(pathContents);

        return `${this.$t("basic.jain_aagam")} - ${pathContents}`;
      }
    },
    AagamName() {
      if (this.$route?.params?.pathMatch) {
        // Add a Trailing Slash because, for e.g., on http://localhost:3000/en/aagam/acharanga/ page, the pathMatch is "acharanga" (not "acharanga/")
        const pathMatch = this.$route.params.pathMatch.endsWith("/")
          ? this.$route.params.pathMatch
          : `${this.$route.params.pathMatch}/`;
        const indexOfFirstSlash = pathMatch.indexOf(`/`);
        // Return only the "acharanga" part of the string.
        return pathMatch.slice(0, indexOfFirstSlash);
      }
    }
  },
  methods: {
    addSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
    },
    translateSlug(text) {
      return text
        .replace(/toc/, this.$t("contents.toc"))
        .replace(/appendix/, this.$t("contents.appendix"))
        .replace(/book/, this.$t("contents.book"))
        .replace(/chapter/, this.$t("contents.chapter"))
        .replace(/episode/, this.$t("contents.episode"))
        .replace(/lesson/, this.$t("contents.lesson"))
        .replace(/sutra/, this.$t("contents.sutra"));
    }
  },
  async fetch() {
    this.ROUTE_PATH = this.$route.path.startsWith(`/hi`)
      ? this.$route.path
      : `/en${this.$route.path}`;

    this.ROUTE_PATH_WITH_SLASH = this.addSlash(this.ROUTE_PATH);

    // CURRENT POST
    this.posts = await this.$content(this.$i18n.locale, {
      deep: true
    })
      .where({
        path: this.ROUTE_PATH_WITH_SLASH.slice(
          0,
          this.ROUTE_PATH_WITH_SLASH.length - 1
        )
        // path: {
        //   $regex: [this.$route.path.slice(0, this.$route.path.length - 1) + "$","gim"]
        // }
      })
      .sortBy("position")
      .sortBy("path")
      .fetch();

    this.post = this.posts[0];

    // SUTRA ORIGINAL TO BE SHOWN ONLY ON SUTRA PAGE
    if (new RegExp(/sutra-[0-9]+\/$/i).test(this.ROUTE_PATH_WITH_SLASH)) {
      const locale = this.ROUTE_PATH_WITH_SLASH.split("/")[1]; // 0 is empty string; so 1 is locale
      const localeCharactersCount = locale.length; // usually it will be 2, e.g. en, hi, gu

      this.sutrasOriginals = await this.$content("original", {
        deep: true
      })
        .where({
          $and: [
            { type: "sutra" },
            {
              path: `/original${this.ROUTE_PATH_WITH_SLASH.slice(
                1 + localeCharactersCount
              ).slice(0, -1)}` // remove the trailing slash
            }
          ]
        })
        .sortBy("position")
        .sortBy("slug")
        .fetch();

      this.sutraOriginal = this.sutrasOriginals[0];
    }

    // CHILDREN
    if (this.post) {
      this.children = await this.$content(`${this.$i18n.locale}`, {
        deep: true
      })
        .without(["body", "toc"])
        .where({
          $and: [{ dir: this.post.path }, { show: { $ne: false } }]
        })
        .sortBy("position", "asc")
        .sortBy("slug", "asc")
        .fetch();
    }

    // SIBLINGS ( PREV-NEXT )
    if (this.post) {
      [this.prevs, this.nexts] = await this.$content(`${this.$i18n.locale}`, {
        deep: true
      })
        .without(["body", "toc"])
        .where({ $and: [{ dir: this.post.dir }, { show: { $ne: false } }] })
        // .where({ index: !true })
        .sortBy("position", "asc")
        .sortBy("slug", "asc")
        .surround(this.post.path)
        .fetch();
    }

    // TABLE OF CONTENTS
    if (this.post) {
      if (this.post.tocLevel === 4) {
        return (this.headings = this.post.toc);
      } else {
        this.headings = this.post.toc.filter(heading => {
          return (
            heading.depth === 1 || heading.depth === 2 || heading.depth === 3
          );
        });
      }
    }
  },
  head() {
    let website = `https://aagam.jainism.info`;

    let defaultAlt = this.$route.path.startsWith("/hi")
      ? `${website}${this.$route.path.slice(3)}`
      : `${website}${this.$route.path}`;

    // if (this.post && this.$route) {
    return {
      title: this.seoTitle,
      meta: [
        // {
        //   hid: `description`,
        //   name: `description`,
        //   content: this.seoDescription
        // },
        {
          hid: "og:title",
          property: "og:title",
          content: this.seoTitle
        }
        // {
        //   hid: `og:description`,
        //   name: `og:description`,
        //   content: this.seoDescription
        // }
      ],
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
    // }
  },
  transition: "slide"
};
</script>

<style lang="sass" scoped>
.active-scroll
  @apply tw-text-lg tw-text-gray-900 hover:tw-shadow-md hover:tw-bg-white tw-bg-white tw-font-bold

.toc_aside
  /* @apply tw-top-32 tw-bottom-16; */
  /* @apply tw-transition-transform; */
  transform: translateX(calc(100%))
  transition-property: transform
  transition-duration: 500ms

.toc_aside-open
  transform: translateX(0%)

.toc_aside-button
  /* @apply tw-fixed tw-top-2 */
  transform: translate(86%, 60px)
  /* transform: translate(80%) */
  transition-property: transform
  transition-duration: 500ms

.toc_aside-button-open
  transform: translate(-12%, 80px)
  /* transform: translateX(-10%) */

</style>

<style lang="sass" src="~/assets/css/all.sass" scoped>
</style>

<style lang="sass" scoped>
.custom-first-letter-capitalize
  &::first-letter
    @apply tw-uppercase
</style>

<style lang="sass" scoped>
.slide-enter-active
  @apply tw-transition-all tw-duration-700
// .slide-leave-active
  // @apply tw-transition-all tw-duration-500
.slide-enter
  @apply tw-transform-gpu tw-transition-all tw-duration-700 tw--translate-x-full
.slide-leave-to
  @apply tw-transform-gpu tw-transition-all tw-duration-700 tw-translate-x-full
</style>