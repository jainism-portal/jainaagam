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
      <article>
        <h1 class="tw-text-center tw-px-2 md:tw-px-4 tw-text-2xl md:tw-text-4xl tw-text-indigo-900 tw-leading-relaxed tw-bg-gradient-to-r tw-from-white tw-to-blue-50 tw-p-2">
          {{seoTitle}}
        </h1>
        <div
          class="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-4"
          v-if="AagamName"
        >
          <nuxt-link
            :to="`/${AagamName}/toc`"
            class="tw-inline-block tw-text-center tw-text-base tw-mt-2 tw-px-3 tw-py-2 !tw-text-purple-700 tw-border tw-border-purple-200 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-rounded"
          ><span class="tw-capitalize">{{AagamName}}</span> Aagam's Table of Contents
          </nuxt-link>
          <nuxt-link
            :to="`/${AagamName}/original`"
            class="tw-inline-block tw-text-center tw-text-base tw-mt-2 tw-px-3 tw-py-2 !tw-text-yellow-700 tw-border tw-border-yellow-200 tw-transform-gpu hover:tw-scale-110 tw-transition-all tw-rounded"
          >Original <span class="tw-capitalize">{{AagamName}}</span> Aagam in Prakrit
          </nuxt-link>
        </div>
        <PostChooseLang
          v-if="langPosts && !(routePathWithSlash.endsWith(`/toc/`)) && !(routePathWithSlash.endsWith(`/original/`))"
          :langPosts="langPosts"
          class="tw-my-4"
        >
        </PostChooseLang>

        <div class="tw-my-4 tw-mx-4">
          <PostChildren
            :AagamName="AagamName"
            :metaPost="metaPost"
            v-if="AagamName && metaPost"
          ></PostChildren>

          <!-- <ReadingTime class="tw-text-sm" :post="child" :showWords="true"   :showTime="false"></ReadingTime> -->

          <SutraOriginal
            :sutraOriginal="sutraOriginal"
            v-if="sutraOriginals.length"
          ></SutraOriginal>
          <nuxt-content
            v-if="post"
            :document="post"
            class="tw-my-3"
          ></nuxt-content>
        </div>
        <footer class="tw-my-6 tw-p-6">
          <PostGitEdit
            v-if="metaPost"
            :metaPostDir="metaPost.dir"
          ></PostGitEdit>
          <PostPrevNext
            :filePathWithoutLocale="filePathWithoutLocale"
            :AagamName="AagamName"
            v-if="AagamName && filePathWithoutLocale"
          ></PostPrevNext>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
import _startcase from "lodash.startcase";

import appLanguages from "~/app/langs.js";

import AppTip from "~/components/atoms/AppTip.vue";

import SutraMeaning from "~/components/atoms/sutra/SutraMeaning.vue";
import SutraExplanation from "~/components/atoms/sutra/SutraExplanation.vue";

import Breadcrumbs from "~/components/organisms/post/Breadcrumbs.vue";
import PostPrevNext from "~/components/organisms/post/PostPrevNext.vue";
import PostGitEdit from "~/components/organisms/post/PostGitEdit.vue";
import PostChildren from "~/components/organisms/post/PostChildren.vue";
import PostChooseLang from "~/components/organisms/post/PostChooseLang.vue";

import AagamOriginal from "~/components/templates/post/AagamOriginal.vue";
import AagamTOC from "~/components/templates/post/AagamTOC.vue";
import SutraOriginal from "~/components/templates/post/SutraOriginal.vue";
import Incomplete from "~/components/templates/Incomplete.vue";

export default {
  name: "AagamDynamicPage",
  components: {
    // Atoms
    AppTip,
    SutraMeaning,
    SutraExplanation,
    // Molecules
    // Organisms
    Breadcrumbs,
    PostPrevNext,
    PostGitEdit,
    PostChildren,
    PostChooseLang,
    // Templates
    "aagam-toc": AagamTOC,
    AagamOriginal,
    SutraOriginal,
    Incomplete
  },
  data() {
    return {
      // POSTS
      allPostsOfDir: [], // meta, en, hi, ... , and original
      metaPost: {}, // langPosition = 0
      nonMetaPosts: [],
      originalPost: {}, // langPosition = 1
      langPosts: [], // langPosition = 2, 3, etc.
      posts: [],
      post: {},
      sutraOriginals: [],
      sutraOriginal: {},
      currentLangPost: {},

      // HEAD META
      alternates: [],
      langs: ["en", "x-default"]
    };
  },
  computed: {
    appLangs() {
      let langs = appLanguages.map(appLang => {
        let langName = new Intl.DisplayNames(["en"], { type: "language" }).of(
          appLang
        );
        if (langName === "mwr") langName = "Marwari";
        return { langCode: appLang, langName: langName };
      });
      return langs;
    },
    routePathWithSlash() {
      if (this.$route) {
        return this.$route.path.endsWith(`/`)
          ? this.$route.path
          : `${this.$route.path}/`;
      }
    },
    seoTitle() {
      let title = "",
        path = "",
        actualTitle = "";
      path = this.routePathWithSlash
        .replace(new RegExp("^" + `/${this.AagamName}`, "i"), "")
        .replace(/\/toc\/$/, "Table of Contents");

      for (const appLang of this.appLangs) {
        path = path.replace(
          new RegExp(`/${appLang.langCode}/`, "i"),
          `${appLang.langName}/`
        );
      }

      path = _startcase(path);

      if (this.currentLangPost && this.currentLangPost.title) {
        actualTitle = this.currentLangPost.title;
      }

      if (actualTitle) {
        title = _startcase(this.AagamName) + " - " + actualTitle + " - " + path;
      } else title = _startcase(this.AagamName) + " - " + path;

      return `Jain Aagam ${title}`;
    },
    AagamName() {
      let path = this.routePathWithSlash.slice(1); // remove the first slash
      return path.slice(0, path.indexOf("/"));
    },
    filePath() {
      return /\/(hi|hi-Latn|gu|gu-Latn|mr|as|bn|kn|mwr|ml|ne|pa|or|sa|si|sd|ta|te|ur|da|de|it|nl|ru)\/$/i.test(
        this.routePathWithSlash
      )
        ? this.routePathWithSlash.slice(0, -1)
        : `${this.routePathWithSlash}en`;
    },
    currentPageLang() {
      const a = this.filePath.lastIndexOf(`/`);
      return this.filePath.slice(a + 1);
    },
    filePathWithoutLocale() {
      let a =
        this.filePath.endsWith(`/toc`) || this.filePath.endsWith(`/original`)
          ? this.filePath
          : this.filePath.slice(0, this.filePath.length - 3); // 3 denotes "/<lang>", e.g. /en, /hi
      return (a = a.endsWith("/") ? a.slice(0, -1) : a); // if lang itself is 3-letter (e.g. /mwr), then remove the trailing slash
    }
  },
  async fetch() {
    // ALL POSTS
    this.allPostsOfDir = await this.$content(`aagam/${this.AagamName}`, {
      deep: true
    })
      .where({
        $and: [
          { dir: `/aagam${this.filePathWithoutLocale}` },
          { show: { $ne: false } }
        ]
      })
      .without(["body", "toc"])
      .sortBy("langPosition", "asc")
      .fetch();

    if (this.allPostsOfDir) {
      // [this.metaPost, ...this.nonMetaPosts] = this.allPostsOfDir;
      this.metaPost = this.allPostsOfDir.filter(post => post.slug === "meta");
      this.metaPost = this.metaPost ? this.metaPost[0] : {};

      this.nonMetaPosts = this.allPostsOfDir.filter(
        post => post.slug !== "meta"
      );
    }

    if (this.nonMetaPosts) {
      this.originalPost = this.nonMetaPosts.filter(
        post => post.slug === "original"
      );
      this.originalPost = this.originalPost ? this.originalPost[0] : {};

      this.langPosts = this.nonMetaPosts.filter(
        post => post.slug !== "original"
      );
      if (this.langPosts) {
        this.currentLangPost = this.langPosts.filter(
          post => post.slug === this.currentPageLang
        );
        this.currentLangPost = this.currentLangPost
          ? this.currentLangPost[0]
          : {};
      }
    }

    // META POST
    // this.metaPosts = await this.$content(`aagam/${this.AagamName}`, {deep: true})
    //   .where({
    //     $and: [
    //       { pathWithSlash: `/aagam${this.filePathWithoutLocale}/meta/` }
    //     ]
    //   })
    //   .without(["body"])
    //   .fetch();

    // CURRENT POST
    if (this.currentLangPost) {
      this.posts = await this.$content(`aagam/${this.AagamName}`, {
        deep: true
      })
        .only(["body", "path", "show"])
        .where({
          $and: [
            // { path: `/aagam${this.filePath}` },
            { path: this.currentLangPost.path },
            { show: { $ne: false } }
          ]
          // path: {
          //   $regex: [this.$route.path.slice(0, this.$route.path.length - 1) + "$","gim"]
          // }
        })
        .fetch();

      this.post = this.posts ? this.posts[0] : {};
    }

    // SUTRA ORIGINAL TO BE SHOWN ONLY ON SUTRA PAGE
    if (
      this.originalPost &&
      new RegExp(/sutra-\d+/).test(this.originalPost.path)
    ) {
      this.sutraOriginals = await this.$content(`aagam/${this.AagamName}`, {
        deep: true
      })
        .where({
          $and: [
            { dir: this.originalPost.dir },
            { slug: `original` },
            { show: { $ne: false } }
          ]
        })
        // .where({$and: [
        //  {path: `/original${this.filePath_WITH_SLASH.slice(1 + localeCharactersCount).slice(0, -1)}` // remove the trailing slash}
        // ]})
        .fetch();

      this.sutraOriginal = this.sutraOriginals ? this.sutraOriginals[0] : {};
    }

    // TABLE OF CONTENTS
    // if (this.post) {
    //   if (this.post.tocLevel === 4) {
    //     return (this.headings = this.post.toc);
    //   } else {
    //     this.headings = this.post.toc.filter(heading => {
    //       return (
    //         heading.depth === 1 || heading.depth === 2 || heading.depth === 3
    //       );
    //     });
    //   }
    // }
  },
  methods: {
    addTrailingSlash(text) {
      return text.endsWith(`/`) ? text : `${text}/`;
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