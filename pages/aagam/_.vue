<template>
  <div>
    <div v-if="$fetchState.pending">Fetching content... Wait a few seconds</div>
    <div v-else-if="$fetchState.error">
      <!-- (post === null && sutraOg === null) || -->
      Wrong URL. Check URL again or go Home.
    </div>
    <div v-else>
      <main v-if="
          !post ||
          (!post && !sutraOriginal)
        ">
        <Incomplete
          :post="post"
          :sutraOg="sutraOg"
        ></Incomplete>
      </main>
      <main
        v-else
        class="md:tw-flex md:tw-flex-row-reverse"
      >
        <article :class="showToc ? 'md:tw-w-[70%]' : 'tw-w-full'">
          <header class="tw-mx-2">
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
                :fullPathMatch="fullPathMatch"
                v-if="fullPathMatch"
              >
              </Breadcrumbs>
            </div>
            <button
              class="tw-fixed tw-z-40 tw-bottom-4 md:tw-bottom-auto md:tw-top-14 tw-right-2 tw-rounded-2xl tw-text-2xl tw-w-10 tw-h-10 md:tw-w-12 md:tw-h-12 tw-font-2xl tw-bg-gradient-to-bl tw-from-white tw-to-blue-200 tw-shadow-md focus:tw-outline-none focus:tw-ring focus:tw-ring-blue-300"
              @click.stop="showToc = !showToc"
            >{{ showToc ? "❌" : "🧾" }}</button>
          </header>

          <main
            class="tw-mx-2"
            :class="showToc ? 'md:tw-mx-8' : 'md:tw-mx-16'"
          >
            <center class="nuxt-content">
              <h1
                v-if="post"
                class="tw-text-3xl"
              >
                {{ $t("jain") }} {{ $t("aagam") }}
                {{ post.type }}
                <span v-if="post.title">
                  - {{ post.title }}</span>
              </h1>
              <h1 v-if="!post && sutraOg">
                {{ $t("jain") }} {{ $t("aagam") }}
                {{ sutraOg.type }}
                <span v-if="sutraOg.title">
                  - {{ sutraOg.title }}</span>
              </h1>
            </center>
              <a
                :href="`https://github.com/madrecha/jainaagam/tree/main/content${post.path}${post.extension}`"
                target="_blank"
                class="tw-text-sm"
              >
                Edit on Github
              </a>
            </center>

            <section class="nuxt-content ">
              <h2>Siblings</h2>
              <div class="tw-flex tw-flex-col md:tw-flex-row tw-justify-around">
                <nuxt-link
                  :to="prevs.path"
                  v-if="this.prevs"
                  class="tw-mx-2"
                ><b class="tw-bg-yellow-100 tw-p-1">Prev</b> 👈🏻 {{prevs.path}}</nuxt-link>
                <nuxt-link
                  :to="nexts.path"
                  v-if="this.nexts"
                  class="tw-mx-2"
                ><b class="tw-bg-indigo-100 tw-p-1">Next</b> 👉🏻 {{nexts.path}}</nuxt-link>
              </div>
            </section>

            <section
              v-if="children && children.length > 0"
              class="nuxt-content "
            >
              <h2
                @click="showChildren = !showChildren"
                class="tw-cursor-pointer"
              >Children</h2>
              <ol
                v-show="showChildren"
                class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 gap-4"
              >
                <li
                  v-for="(child, i) in children"
                  :key="i"
                  class="tw-m-4"
                >
                  <nuxt-link
                    :to="`${child.path}`"
                    class="!tw-p-0.5"
                    :class="{'tw-bg-green-100 tw-p-1 tw-text-green-800': child.done}"
                  >
                    <span class="tw-text-sm md:tw-text-base">{{ child.title ? child.title : child.slug }}</span>
                  </nuxt-link>
                  <ReadingTime
                    :post="child"
                    :showWords="true"
                  ></ReadingTime>
                </li>
              </ol>
            </section>
            <section class="tw-border-t tw-border-gray-600 tw-my-4">
              <section
                v-if="sutraOriginal"
                class="nuxt-content"
              >
                <h2>Sutra</h2>
                <NuxtContent :document="sutraOriginal.sutra"></NuxtContent>
              </section>
              <section
                v-if="post"
                class="nuxt-content"
              >
                <NuxtContent :document="post"></NuxtContent>
              </section>
            </section>
          </main>
          <footer class="nuxt-content">
            Post footer. Author. Comments. Related. Share.
          </footer>
        </article>
        <aside :class="showToc ? 'tw-w-[30%]' : 'md:tw-w-0'">
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
              v-dragscroll
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
        </aside>
      </main>
      <GoTop></GoTop>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import PdfTest from "~/components/PdfTest.vue";

export default {
  components: {
    Breadcrumbs,
    PdfTest
  },
  data() {
    return {
      // POSTS
      posts: [],
      post: null,
      sutrasOg: [],
      sutraOg: null,

      // ROUTING
      routePath: "",
      pathMatch: "",
      fullPathMatch: "",

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
  async fetch() {
    // const _ = require("lodash");

    this.routePath = this.$route.path.endsWith("/")
      ? this.$route.path
      : `${this.$route.path}/`;

    this.pathMatch = this.$route.params.pathMatch.endsWith("/")
      ? this.$route.params.pathMatch
      : `${this.$route.params.pathMatch}/`;

    this.fullPathMatch = this.$route.fullPath.endsWith("/")
      ? this.$route.fullPath
      : `${this.$route.fullPath}/`;

    // let aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // CURRENT POST
    this.posts = await this.$content(`${this.$i18n.locale}`, {
      deep: true
    })
      .where({
        path: {
          $regex: [
            this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
            "gim"
          ]
        }
      })
      .sortBy("position")
      .sortBy("slug")
      .fetch();

    this.post = this.posts[0];

    // SUTRA ORIGINAL TO BE SHOWN ONLY ON SUTRA PAGE
    if (new RegExp(/sutra-[0-9]+\/$/i).test(this.routePath)) {
      this.sutrasOriginals = await this.$content("aagam", {
        deep: true
      })
        .where({
          $and: [
            { type: "sutra" },
            {
              path: {
                $regex: [
                  this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
                  "gim"
                ]
              }
            }
          ]
        })
        .sortBy("position")
        .sortBy("slug")
        .fetch();

      this.sutraOriginal = this.sutrasOriginals[0];
    }

    // CHILDREN
    this.children = await this.$content(`${this.$i18n.locale}`, {
      deep: true
    })
      .without(["body", "toc"])
      .where({
        $and: [{ dir: this.post.path }]
      })
      .sortBy("position", "asc")
      .sortBy("slug", "asc")
      .fetch();

    // SIBLINGS ( PREV-NEXT )
    [this.prevs, this.nexts] = await this.$content(`${this.$i18n.locale}`, {
      deep: true
    })
      .without(["body", "toc"])
      .where({ $and: [{ dir: this.post.dir }] })
      // .where({ index: !true })
      .sortBy("position", "asc")
      .sortBy("slug", "asc")
      .surround(this.post.path)
      .fetch();

    // TABLE OF CONTENTS
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
};
</script>

<style lang="postcss" scoped>
.active-scroll {
  @apply tw-text-lg tw-text-gray-900 hover:tw-shadow-md hover:tw-bg-white tw-bg-white tw-font-bold;
}
.toc_aside {
  /* @apply tw-top-32 tw-bottom-16; */
  /* @apply tw-transition-transform; */
  transform: translateX(calc(100%));
  transition-property: transform;
  transition-duration: 500ms;
}

.toc_aside-open {
  transform: translateX(0%);
}

.toc_aside-button {
  /* @apply tw-fixed tw-top-2; */
  transform: translate(86%, 60px);
  /* transform: translate(80%); */
  transition-property: transform;
  transition-duration: 500ms;
}
.toc_aside-button-open {
  transform: translate(-12%, 80px);
  /* transform: translateX(-10%); */
}
</style>

<style lang="postcss">
.nuxt-content p,
a,
ul,
ol,
li,
blockquote {
  @apply tw-my-3 !important;
}

.nuxt-content h1,
h2,
h3,
h4 {
  @apply tw-my-4 !important;
}
</style>