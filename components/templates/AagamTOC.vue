<template>
  <!-- NOTE: The groupedChildren starts from 3 -->
  <div>
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching the Table of Contents... 💖 Wait for a few seconds 😊
    </div>
    <div
      v-else
      class="tw-mt-3 tw-text-gray-600"
    >
      <nav v-if="children">
        <header>
          <h2 class="tw-capitalize tw-text-xl md:tw-text-2xl tw-text-center tw-p-2 tw-text-pink-900">{{AagamName}} Sutra contents</h2>

          <p class="tw-text-center">{{children.length}} contents</p>
          <div class="tw-mt-3 tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            <v-btn
              @click="closeAll"
              class="!tw-bg-blue-50"
            >Close All</v-btn>
            <v-tooltip
              bottom
              open-on-focus
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click="openAll"
                  class="!tw-bg-pink-50"
                >Open All
                </v-btn>
              </template>
              <span>Careful: Opening all {{children.length}} contents may be huge</span>
            </v-tooltip>
          </div>
        </header>

        <ol
          v-if="groupedChildren['3'] && groupedChildren['3'].length"
          class="tw-mt-6"
        >
          <li
            v-for="child3 in groupedChildren['3']"
            :key="child3.to"
            class="list-item list-item--3"
          >
            <details
              open
              class="details details--3"
            >
              <summary class="summary summary--3 tw-group">
                <nuxt-link
                  :to="localePath(child3.to)"
                  class="link"
                > {{$i18n.locale === 'hi' ? child3.slugHi : child3.slug}}<span
                    v-if="child3.title"
                    class="post-title"
                  >({{child3.title}})</span>
                </nuxt-link>
                <span
                  class="contents-count"
                  v-if="groupedChildren['4'].filter(child => child.to.startsWith(child3.to + `/`)).length"
                >
                  {{groupedChildren['4'].filter(child => child.to.startsWith(child3.to + `/`)).length}} contents
                </span>

              </summary>
              <ol
                v-if="groupedChildren['4'] && groupedChildren['4'].length"
                class="ol ol--4"
              >
                <li
                  v-for="child4 in groupedChildren['4'].filter(child => {
                return child.to.startsWith(child3.to + `/`);
                })"
                  :key="child4.to"
                  class="list-item list-item--4"
                >
                  <details class="details details--4">

                    <summary class="summary summary--4 tw-group">

                      <nuxt-link
                        :to="localePath(child4.to)"
                        class="link"
                      > {{$i18n.locale === 'hi' ? child4.slugHi : child4.slug}} <span
                          v-if="child4.title"
                          class="post-title"
                        >({{child4.title}})</span>
                      </nuxt-link>
                      <span
                        class="contents-count"
                        v-if="groupedChildren['5'] && groupedChildren['5'].filter(child => child.to.startsWith(child4.to + `/`)).length"
                      >
                        {{groupedChildren['5'].filter(child => child.to.startsWith(child4.to + `/`)).length}} contents
                      </span>
                    </summary>

                    <ol
                      v-if="groupedChildren['5'] && groupedChildren['5'].length"
                      class="ol ol--5"
                    >
                      <li
                        v-for="child5 in groupedChildren['5'].filter(child => {
                      return child.to.startsWith(child4.to + '/')})"
                        :key="child5.to"
                        :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? 'list-item list-item--5' : 'list-item-without-details-tag'"
                      >
                        <component
                          :is="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? 'details' : 'div'"
                          :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? 'details details--5' : null"
                          :open="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? true : false"
                        >

                          <component
                            :is="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? 'summary' : 'div'"
                            :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length > 0 ? 'summary summary--5 tw-group' : null"
                          >
                            <nuxt-link
                              :to="localePath(child5.to)"
                              class="link"
                            > {{$i18n.locale === 'hi' ? child5.slugHi : child5.slug}} <span
                                v-if="child5.title"
                                class="post-title"
                              >({{child5.title}})</span>

                            </nuxt-link>
                            <span
                              class="contents-count"
                              v-if="groupedChildren['6'] && groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length"
                            >
                              {{groupedChildren['6'].filter(child => child.to.startsWith(child5.to + `/`)).length}} contents
                            </span>
                          </component>
                          <ol
                            v-if="groupedChildren['6'] && groupedChildren['6'].length"
                            class="ol ol--6"
                          >
                            <li
                              v-for="child6 in groupedChildren['6'].filter(child => {
                            return child.to.startsWith(child5.to + '/')})"
                              :key="child6.to"
                              :class="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? 'list-item list-item--6' : 'list-item-without-details-tag'"
                            >

                              <component
                                :is="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? 'details' : 'div'"
                                :class="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? 'details details--6' : null"
                                :open="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? true : false"
                              >
                                <!-- groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length < 3 ? true : false" -->

                                <component
                                  :is="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? 'summary' : 'div'"
                                  :class="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length > 0 ? 'summary summary--6 tw-group' : null"
                                >
                                  <nuxt-link
                                    :to="localePath(child6.to)"
                                    class="link"
                                  > {{$i18n.locale === 'hi' ? child6.slugHi : child6.slug}} <span
                                      v-if="child6.title"
                                      class="post-title"
                                    >({{child6.title}})</span>
                                  </nuxt-link>
                                  <span
                                    class="contents-count"
                                    v-if="groupedChildren['7'] && groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length"
                                  >
                                    {{groupedChildren['7'].filter(child => child.to.startsWith(child6.to + `/`)).length}} contents
                                  </span>
                                </component>
                                <ol
                                  v-if="groupedChildren['7'] && groupedChildren['7'].length"
                                  class="ol ol--7"
                                >
                                  <li
                                    v-for="child7 in groupedChildren['7'].filter(child => {
                                  return child.to.startsWith(child6.to + '/')})"
                                    :key="child7.to"
                                  >

                                    <div class="">
                                      <nuxt-link
                                        :to="localePath(child7.to)"
                                        class="link"
                                      > {{$i18n.locale === 'hi' ? child7.slugHi : child7.slug}} <span
                                          v-if="child7.title"
                                          class="post-title"
                                        >({{child7.title}})</span>
                                      </nuxt-link>
                                    </div>
                                    <ol
                                      v-if="groupedChildren['8']"
                                      class="ol ol--8"
                                    >
                                      <li
                                        v-for="child8 in groupedChildren['8'].filter(child => {
                                  return child.to.startsWith(child7.to + '/')})"
                                        :key="child8.to"
                                      >
                                        <div class="">
                                          <nuxt-link
                                            :to="localePath(child8.to)"
                                            class="link"
                                          > {{$i18n.locale === 'hi' ? child8.slugHi : child8.slug}} <span
                                              v-if="child8.title"
                                              class="post-title"
                                            >({{child8.title}})</span>
                                          </nuxt-link>
                                        </div>
                                      </li>
                                    </ol>
                                  </li>
                                </ol>
                              </component>
                            </li>
                          </ol>
                        </component>
                      </li>
                    </ol>
                  </details>
                </li>
              </ol>
            </details>
          </li>
        </ol>
      </nav>
      <!-- <ol class="!tw-list-none">
      <li
        v-for="child in children"
        :key="child.to"
        :class="
        child.to.match((/\//g) || []).length === 3 ? 'tw-pl-0'
        : child.to.match((/\//g) || []).length === 4 ? 'tw-pl-4 md:tw-pl-8'
        : child.to.match((/\//g) || []).length === 5 ? 'tw-pl-8 md:tw-pl-16' 
        : child.to.match((/\//g) || []).length === 6 ? 'tw-pl-12 md:tw-pl-24' 
        : child.to.match((/\//g) || []).length === 7 ? 'tw-pl-16 md:tw-pl-32' 
        : child.to.match((/\//g) || []).length === 8 ? 'tw-pl-20 md:tw-pl-40' 
        : child.to.match((/\//g) || []).length === 9 ? 'tw-pl-24 md:tw-pl-48' 
        : child.to.match((/\//g) || []).length === 10 ? 'tw-pl-28 md:tw-pl-56' 
        : child.to.match((/\//g) || []).length === 11 ? 'tw-pl-32 md:tw-pl-64' 
        : null"
      >
        <nuxt-link
          :to="localePath(child.to)"
          class="link"
        > {$i18n.locale === 'hi' ? {child.slugHi : childxx.slug}}
        </nuxt-link>
      </li>
    </ol> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "AagamTableOfContents",
  props: {},
  data() {
    return {
      post: null,
      posts: [],
      children: null,
      groupedChildren: null
    };
  },
  async fetch() {
    // const ROUTE_PATH = this.$route.path.startsWith(`/aagam`)
    //   ? `/en${this.$route.path}`
    //   : this.$route.path;

    this.posts = await this.$content(this.$i18n.locale, {
      deep: true
    })
      .without(["body"])
      .where({
        // "/en/aagam/acharanga" or "/hi/aagam/acharanga"
        path: `/${this.$i18n.locale}/aagam/${this.AagamName}`

        // path: ROUTE_PATH.endsWith(`/`)
        // ? ROUTE_PATH.slice(0, -5) // 4 denotes "toc/"
        // : ROUTE_PATH.slice(0, -4) // 3 denotes "toc"

        // With the above query, we could use the component only on "toc" pages. But now with new query with AagamName, we can use the component in any aagam file.
      })
      .fetch();

    this.post = this.posts[0];

    if (this.post) {
      this.children = await this.$content(this.$i18n.locale, {
        deep: true
      })
        .only(["dir", "path", "to", "slug", "position", "title"])
        .where({
          $and: [
            { path: { $regex: ["^" + this.post.path + "/" + "[a-z]+"] } },
            { show: { $ne: false } },
            { type: { $ne: "toc" } }
          ]
        })
        .sortBy("path")
        .fetch();

      this.children.forEach(child => {
        return (child.slugHi = child.slug
          .replace(/toc/, this.$t("contents.toc"))
          .replace(/appendix/, this.$t("contents.appendix"))
          .replace(/book/, this.$t("contents.book"))
          .replace(/chapter/, this.$t("contents.chapter"))
          .replace(/episode/, this.$t("contents.episode"))
          .replace(/lesson/, this.$t("contents.lesson"))
          .replace(/part/, this.$t("contents.part"))
          .replace(/sutra/, this.$t("contents.sutra")));
      });

      this.groupedChildren = _.groupBy(this.children, child => {
        return child.to.match(/\//g || []).length;
      });

      this.groupedChildren["3"] = _.sortBy(
        this.groupedChildren["3"],
        ["position"],
        ["asc"]
      );
      this.groupedChildren["4"] = _.sortBy(
        this.groupedChildren["4"],
        ["position"],
        ["asc"]
      );
      this.groupedChildren["5"] = _.sortBy(
        this.groupedChildren["5"],
        ["position"],
        ["asc"]
      );
      this.groupedChildren["6"] = _.sortBy(
        this.groupedChildren["6"],
        ["position"],
        ["asc"]
      );
      this.groupedChildren["7"] = _.sortBy(
        this.groupedChildren["7"],
        ["position"],
        ["asc"]
      );
    }
  },
  computed: {
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
    detailsTags() {
      let details = document.querySelectorAll(".details");
      return details;
    },
    closeAll() {
      let details = this.detailsTags();
      details.forEach(detailEl => {
        if (detailEl.open === true) {
          detailEl.open = false;
        }
      });
      this.isOpen = false;
    },
    openAll() {
      let details = this.detailsTags();
      details.forEach(detailEl => {
        if (detailEl.open === false) {
          detailEl.open = true;
        }
      });
      this.isOpen = true;
    }

    //   toggleItem(itemIndex) {
    //     this.isListOpen = !this.isListOpen;

    //     this.isListOpen
    //       ? (this.currentIndex = !itemIndex)
    //       : (this.currentIndex = itemIndex);
    //   }
  }
};
</script>

<style lang="sass" scoped>

/////////////////////// 
// The Text portion

.link
  @apply tw-break-words
  @apply hover:tw-text-linkblue hover:tw-underline
  // @apply tw-text-blue-800 #{!important}

.post-title
  @apply tw-text-sm md:tw-text-base

.contents-count
  @apply tw-text-sm tw-inline-block tw-mr-auto tw-text-gray-400 group-hover:tw-text-gray-700

/////////////////////// 
// The HTML portion

.ol
  @apply tw-pr-1 tw-pb-2 tw-pl-2 md:tw-pl-6

.list-item
  @apply tw-my-3
  @apply tw-rounded tw-border
  @apply tw-bg-gradient-to-bl tw-from-white tw-via-white
  &--3
    @apply tw-border-pink-300 tw-to-pink-50
  &--4
    @apply tw-border-blue-300 tw-to-blue-50
  &--5
    @apply tw-border-green-300 tw-to-green-50
  &--6
    @apply tw-border-purple-300 tw-to-purple-50

.list-item-without-details-tag
  @apply tw-px-1
  &:first-child
    @apply tw-py-2
  &:not(:first-child)
    @apply tw-py-1 md:tw-py-2
  &:not(:last-child)
    @apply tw-border-b

.details
  &--3
    ::marker
      @apply tw-text-pink-600
  &--4
    ::marker
      @apply tw-text-blue-700
  &--5
    ::marker
      @apply tw-text-green-600
  &--6
    ::marker
      @apply tw-text-purple-600

.summary
  @apply tw-pl-2 md:tw-pl-4
  @apply tw-py-2 tw-cursor-pointer hover:tw-shadow-md tw-rounded
  @apply tw-bg-gradient-to-r tw-from-white tw-via-white hover:tw-bg-gradient-to-b
  &--3
    @apply tw-to-pink-50 tw-text-pink-800
  &--4
    @apply tw-to-blue-50 tw-text-blue-800
  &--5
    @apply tw-to-green-50 tw-text-green-800
  &--6
    @apply tw-to-purple-50 tw-text-purple-800

</style>