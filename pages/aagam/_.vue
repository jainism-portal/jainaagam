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
      class="nuxt-content tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      <!-- (post === null && sutraOriginal === null) || -->
      <h1 class="tw-text-3xl">404 error. Page not found.</h1>
      <ol class="tw-mt-3">
        <li>Check URL again</li>
        <li>This page is not yet available in {{$i18n.localeProperties.name}} language. Choose different language. OR</li>
        <li>Go <nuxt-link :to="localePath(`/`)">Home</nuxt-link>
        </li>
      </ol>
    </div>
    <div v-else>

      <main class="md:tw-flex md:tw-flex-row-reverse">
        <article :class="showToc ? 'md:tw-w-[70%]' : 'tw-w-full'">
          <nav class="tw-mx-2">
            <!-- <header
            v-if="post && post.order"
            class="tw-bg-white tw-sticky tw-top-14 tw-z-20 tw-border-b tw-border-gray-300 tw-text-center tw-pt-1 tw-pb-2 tw-mb-2 md:tw-mt-0 md:tw-mb-4"
          > -->
            <!-- <nav class="tw-flex tw-flex-wrap tw-justify-center tw-items-center">
              <p class="tw-inline tw-mr-2">
                <nuxt-link
                  :to="`/${$i18n.locale}/aagam/${$route.params.aagam}/table-of-contents`"
                  class="tw-text-pink-600 tw-underline tw-font-medium tw-capitalize"
                >{{ $route.params.aagam }} Aagam TOC</nuxt-link>
                |
              </p>
              <p
                v-for="(items, i) in Object.entries(
                  post.order
                )"
                :key="i"
                class="tw-inline"
              >
                <span
                  v-for="(item, i2) in items"
                  :key="i2"
                >
                  <span v-if="typeof item === 'string' && item != 'cat'">{{ item }}-</span><span v-if="typeof item === 'object'">{{ item.position }} →
                  </span>
                </span>
              </p>
            </nav> -->
            <!-- </header> -->
            <div class="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-bg-white">
              <Breadcrumbs
                :fullPathMatch="$route.fullPath"
                v-if="$route.fullPath"
              >
              </Breadcrumbs>
            </div>
            <!-- <button
              class="tw-fixed tw-z-40 tw-bottom-4 md:tw-bottom-auto md:tw-top-14 tw-right-2 tw-rounded-2xl tw-text-2xl tw-w-10 tw-h-10 md:tw-w-12 md:tw-h-12 tw-font-2xl tw-bg-gradient-to-bl tw-from-white tw-to-blue-200 tw-shadow-md focus:tw-outline-none focus:tw-ring focus:tw-ring-blue-300"
              @click.stop="showToc = !showToc"
            >{{ showToc ? "❌" : "🧾" }}</button> -->
          </nav>

          <main v-if="
          !post ||
          (!post && !sutraOriginal)
        ">
            <Incomplete
              :post="post"
              :sutraOg="sutraOriginal"
            ></Incomplete>
          </main>

          <main
            v-else
            class="tw-mx-2"
            :class="showToc ? 'md:tw-mx-8' : 'md:tw-mx-16'"
          >
            <header class="tw-text-center">
              <h1
                v-if="post"
                class="tw-text-3xl"
              >
                {{ $t("jain") }} {{ $t("aagam") }} <span
                  v-if="post.type"
                  class="tw-capitalize"
                >
                  - {{ post.type }}</span> <span v-if="post.position">
                  {{ post.position }}</span>
                <span v-if="post.title">
                  - {{ post.title }}</span>
              </h1>
              <h1 v-if="!post && sutraOriginal">
                {{ $t("jain") }} {{ $t("aagam") }}
                {{ sutraOriginal.type }}
                <span v-if="sutraOriginal.title">
                  - {{ sutraOriginal.title }}</span>
              </h1>
              <div
                class="tw-mt-3 tw-text-gray-600"
                v-if="$route.params.pathMatch"
              >
                <nuxt-link :to="`/${$i18n.locale}/aagam/${AagamName}/index/`">View {{AagamName}} Aagam's Index
                </nuxt-link>
              </div>
            </header>

            <section
              v-if="children && children.length > 0"
              class="nuxt-content "
            >
              <h2
                @click="showChildren = !showChildren"
                class="tw-cursor-pointer"
              >Contents</h2>
              <ol
                v-show="showChildren"
                class="!tw-list-none tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2"
              >
                <li
                  v-for="(child, i) in children"
                  :key="i"
                >
                  <nuxt-link
                    :to="`${child.path}`"
                    class="tw-p-1"
                  >
                    <span class="tw-text-sm md:tw-text-lg tw-capitalize">{{ child.title ? `${child.slug} - ${child.title}` : child.slug }}</span>
                  </nuxt-link>
                  <!-- <ReadingTime
                    class="tw-text-sm"
                    :post="child"
                    :showWords="true"
                    :showTime="false"
                  ></ReadingTime> -->
                </li>
              </ol>
            </section>
            <section class="tw-border-t tw-border-gray-600 tw-my-4">
              <section
                v-if="sutraOriginal"
                class="nuxt-content"
              >
                <h2>Sutra</h2>
                <nuxt-content :document="sutraOriginal"></nuxt-content>
              </section>
              <section
                v-if="post.body.children.length == 0"
                class="nuxt-content tw-mt-3"
              >
                <div class="tw-bg-yellow-50 tw-p-4 tw-text-gray-600 !tw-text-base">
                  <div>😊 The page for this <span class="tw-capitalize tw-font-medium">{{post.type ? post.type : `post`}}</span> is yet to be added. You may check its <b>Contents</b>. </div>
                  <div class="tw-mt-3">This is an Open source project, so you too can easily <a
                      :href="`https://github.com/madrecha/jainaagam/tree/main/content${post.path.endsWith(`/`) ? post.path.slice(0, -1) : post.path}${post.extension}`"
                      target="_blank"
                    >
                      Contribute on GitHub
                    </a>. Your contributions will help the international Jain community to better access Jain Aagam in multiple languages. For more details, you can contact <a href="mailto:madrechamanas@gmail.com">Manas Madrecha</a>. Thank you. Jai Jindendra. 🙏🏻</div>
                </div>
              </section>

              <nuxt-content
                v-else
                :document="post"
                class="tw-mt-3"
              ></nuxt-content>

            </section>
          </main>
          <footer class="nuxt-content tw-m-4 tw-border-t tw-border-gray-600">
            <section class="tw-mt-3 tw-flex tw-flex-col md:tw-flex-row tw-justify-around">
              <nuxt-link
                :to="localePath(prevs.path)"
                v-if="prevs"
                class="tw-mx-2"
              >Prev 👈🏻 {{prevs.slug}}</nuxt-link>
              <nuxt-link
                :to="localePath(nexts.path)"
                v-if="nexts"
                class="tw-mx-2"
              >Next 👉🏻 {{nexts.slug}}</nuxt-link>
            </section>

            <div class="tw-text-center tw-bg-green-50 tw-mt-3 tw-p-3">
              <a
                :href="`https://github.com/madrecha/jainaagam/tree/main/content${post.path.endsWith(`/`) ? post.path.slice(0, -1) : post.path}${post.extension}`"
                target="_blank"
                class="tw-block tw-text-sm"
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
      </main>
      <GoTop></GoTop>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import AagamIndex from "~/components/templates/AagamIndex.vue";

export default {
  name: "AagamVuePage",
  components: {
    Breadcrumbs,
    AagamIndex
  },
  data() {
    return {
      // POSTS
      posts: [],
      post: null,
      sutrasOriginals: [],
      sutraOriginal: null,

      // CHILDREN
      children: null,
      showChildren: true,

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
        let changeCase = require("change-case");
        let pathContents = `${changeCase.sentenceCase(
          this.$route.params.pathMatch
        )}`;

        pathContents = pathContents
          .replace(/toc/, this.$t("contents.toc"))
          .replace(/appendix/, this.$t("contents.appendix"))
          .replace(/book/, this.$t("contents.book"))
          .replace(/chapter/, this.$t("contents.chapter"))
          .replace(/episode/, this.$t("contents.episode"))
          .replace(/lesson/, this.$t("contents.lesson"))
          .replace(/sutra/, this.$t("contents.sutra"));
        return `${this.$t("basic.jain_aagam")} - ${pathContents}`;
      }
    },
    AagamName() {
      // Add a Trailing Slash because, for e.g., on http://localhost:3000/en/aagam/acharanga/ page, the pathMatch is "acharanga" (not "acharanga/")
      const pathMatch = this.$route.params.pathMatch.endsWith("/")
        ? this.$route.params.pathMatch
        : `${this.$route.params.pathMatch}/`;
      const indexOfFirstSlash = pathMatch.indexOf(`/`);
      // Return only the "acharanga" part of the string.
      return pathMatch.slice(0, indexOfFirstSlash);
    }
  },
  async fetch() {
    const ROUTE_PATH = this.$route.path.startsWith(`/aagam`)
      ? `/en${this.$route.path}`
      : this.$route.path;

    const ROUTE_PATH_WITH_SLASH = ROUTE_PATH.endsWith(`/`)
      ? ROUTE_PATH
      : `${ROUTE_PATH}/`;

    // CURRENT POST
    this.posts = await this.$content(this.$i18n.locale, {
      deep: true
    })
      .where({
        path: ROUTE_PATH.endsWith(`/`)
          ? ROUTE_PATH.slice(0, ROUTE_PATH.length - 1)
          : ROUTE_PATH
        // path: {
        //   $regex: [this.$route.path.slice(0, this.$route.path.length - 1) + "$","gim"]
        // }
      })
      .sortBy("position")
      .sortBy("slug")
      .fetch();

    this.post = this.posts[0];

    // SUTRA ORIGINAL TO BE SHOWN ONLY ON SUTRA PAGE
    if (new RegExp(/sutra-[0-9]+\/$/i).test(ROUTE_PATH_WITH_SLASH)) {
      const locale = ROUTE_PATH_WITH_SLASH.split("/")[1]; // 0 is empty string; so 1 is locale
      const localeCharactersCount = locale.length; // usually it will be 2, e.g. en, hi, gu

      this.sutrasOriginals = await this.$content("aagam", {
        deep: true
      })
        .where({
          $and: [
            { type: "sutra" },
            {
              path: ROUTE_PATH_WITH_SLASH.slice(
                1 + localeCharactersCount
              ).slice(0, -1) // remove the trailing slash
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
  }
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

  },
  head() {
    if (this.post && this.$route) {
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
        ]
      };
    }
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