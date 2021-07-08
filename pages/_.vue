<template>
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching... 💖 Wait for a few seconds 😊
    </div>
    <article
      v-else
      lang="en"
    >
      <Breadcrumbs
        v-if="$route.path"
        :path="$route.path.endsWith(`/`) ? $route.path : `${$route.path}/`"
      >
      </Breadcrumbs>
      <h1 class="nuxt-content-h1">
        {{seoTitle}}
      </h1>
      <div
        class="tw-my-3 tw-px-2 tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-gap-2 md:tw-gap-4 tw-capitalize tw-text-center tw-text-base tw-font-medium"
        v-if="AagamName"
      >
        <nuxt-link
          :to="`/${AagamName}/toc`"
          class="tw-text-purple-600 hover:tw-text-purple-800 md:tw-px-2 md:tw-py-2 md:tw-border tw-border-gray-100 md:tw-border-purple-300 md:hover:tw-border-purple-700 tw-rounded md:hover:tw-bg-gradient-to-br md:hover:tw-from-white md:hover:tw-to-purple-50"
        >{{AagamName}} Table of Contents
        </nuxt-link>
        <nuxt-link
          :to="`/${AagamName}/original`"
          class="tw-text-yellow-600 hover:tw-text-yellow-800 md:tw-px-2 md:tw-py-2 md:tw-border tw-border-gray-100 md:tw-border-yellow-300 md:hover:tw-border-yellow-700 tw-rounded md:hover:tw-bg-gradient-to-br md:hover:tw-from-white md:hover:tw-to-yellow-50"
        >Original {{AagamName}} Aagam in Prakrit
        </nuxt-link>
      </div>
      <PostChooseLang
        :langPosts="langPosts"
        v-if="langPosts && langPosts.length && !(routePathWithSlash.endsWith(`/toc/`)) && !(routePathWithSlash.endsWith(`/original/`))"
      >
      </PostChooseLang>

      <div class="tw-mb-4 tw-container tw-mx-auto tw-px-4">
        <PostChildren
          :AagamName="AagamName"
          :metaPost="metaPost"
          v-if="AagamName && metaPost"
        ></PostChildren>

        <!-- <ReadingTime class="tw-text-sm" :post="child" :showWords="true"   :showTime="false"></ReadingTime> -->

        <!-- <Incomplete
            v-if="!currentLangPost"
            class="tw-my-3 md:tw-my-6"
          ></Incomplete> -->

        <SutraOriginal
          :sutraOriginal="sutraOriginal"
          v-if="sutraOriginals.length"
        ></SutraOriginal>
        <nuxt-content
          v-if="post"
          :document="post"
          class="tw-my-3"
          :lang="currentPageLang"
        ></nuxt-content>
        <footer>
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
      </div>
    </article>
  </div>
</template>

<script>
import _startcase from "lodash.startcase";

import appLanguages from "~/app/langs.js";

import AppTip from "~/components/atoms/AppTip.vue";

import SutraMeaning from "~/components/atoms/sutra/SutraMeaning.vue";
import SutraExplanation from "~/components/atoms/sutra/SutraExplanation.vue";
import SutraGlossary from "~/components/atoms/sutra/SutraGlossary.vue";

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
    SutraGlossary,
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
        title = _startcase(this.AagamName) + " - " + actualTitle;
      } else title = _startcase(this.AagamName);

      if (path !== "") {
        title = title + " - " + path;
      } else title = title;

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
  },
  head() {
    let website = `https://aagam.jainism.info`;

    this.routePathWithSlash;

    if (this.metaPost) {
      if (this.langPosts) {
        let langPosts = this.langPosts.filter(post => post.slug !== "en");

        for (const langPost of langPosts) {
          this.langs.push(langPost.slug);
        }
      }

      this.langs = [...new Set(this.langs)];

      for (const lang of this.langs) {
        const path =
          lang === "en" || lang === "x-default"
            ? `${this.metaPost.dirWithoutAagam}/`
            : `${this.metaPost.dirWithoutAagam}/${lang}/`;

        this.alternates.push({
          rel: "alternate",
          href: website + path,
          hreflang: lang
        });
      }

      // https://stackoverflow.com/a/56757215
      this.alternates = this.alternates.filter(
        (v, i, a) => a.findIndex(t => t.hreflang === v.hreflang) === i
      );
    } else {
      for (const lang of this.langs) {
        const path = `${this.routePathWithSlash}/`;

        this.alternates.push({
          rel: "alternate",
          href: website + path,
          hreflang: lang
        });
      }
    }

    if (
      this.alternates &&
      this.alternates.length &&
      this.seoTitle &&
      this.currentPageLang
    ) {
      return {
        title: this.seoTitle,
        htmlAttrs: {
          lang: this.currentPageLang
        },
        meta: [
          {
            hid: "og:title",
            property: "og:title",
            content: this.seoTitle
          }
          // {
          //   hid: `description`,
          //   name: `description`,
          //   content: this.seoDescription
          // },
          // {
          //   hid: `og:description`,
          //   name: `og:description`,
          //   content: this.seoDescription
          // }
        ],
        link: [...this.alternates]
      };
    }
  }
};
</script>

<style lang="sass" scoped>
.active-scroll
  @apply tw-text-lg tw-text-gray-900 hover:tw-shadow-md hover:tw-bg-white tw-bg-white tw-font-bold

// .slide-enter-active
//   @apply tw-transition-all tw-duration-700
// .slide-enter
//   @apply tw-transform-gpu tw-transition-all tw-duration-700 tw--translate-x-full
// .slide-leave-to
//   @apply tw-transform-gpu tw-transition-all tw-duration-700 tw-translate-x-full

// .slide-leave-active
// @apply tw-transition-all tw-duration-500
</style>

<style lang="sass" scoped>
// To override vuetify para
p
  @apply tw-my-3 md:tw-my-6
</style>