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
          <h2 class="first-letter:tw-uppercase tw-text-center">{{AagamName}} Sutra contents</h2>

          <p class="tw-text-center">{{children.length}} contents</p>
          <div class="tw-my-3 tw-flex tw-flex-wrap tw-justify-center tw-gap-2 md:tw-gap-4">
            <button
              v-ripple
              @click="closeAll"
              class="tw-to-blue-100 tw-text-blue-900"
            >Close All</button>
            <button
              v-ripple
              @click="openAll"
              class="tw-to-pink-100 tw-relative tw-group tw-text-pink-800"
            >Open All
              <div class="tw-absolute tw-top-10 max-w-[40vw] tw-overflow-x-auto tw-transition-all tw-scale-0 group-hover:tw-scale-100 tw-border tw-p-2 tw-bg-gradient-to-br tw-from-yellow-50 tw-to-yellow-100 tw-lowercase first-letter:tw-uppercase tw-rounded tw-text-xs md:tw-text-base tw-break-all">You are opening all {{children.length}}!</div>
            </button>
          </div>
        </header>

        <ol
          v-if="groupedChildren['2'] && groupedChildren['2'].length"
          class="!tw-pl-0 md:!tw-pl-4 !tw-list-none"
        >
          <li
            v-for="child2 in groupedChildren['2']"
            :key="child2.paddedDepth"
            class="list-item list-item--2"
          >
            <details
              open
              class="details details--2"
            >
              <summary class="summary summary--2 tw-group">
                <nuxt-link
                  :to="child2.dirWithoutAagam"
                  class="link"
                > {{child2.slugurl}}<span
                    v-if="child2.title"
                    class="post-title"
                  >({{child2.title}})</span>
                </nuxt-link>
                <span
                  class="contents-count"
                  v-if="groupedChildren['3'].filter(child => child.dirWithoutAagam.startsWith(child2.dirWithoutAagam + `/`)).length"
                > {{groupedChildren['3'].filter(child => child.dirWithoutAagam.startsWith(child2.dirWithoutAagam + `/`)).length}} contents
                </span>

              </summary>
              <ol
                v-if="groupedChildren['3'] && groupedChildren['3'].filter(child => child.dirWithoutAagam.startsWith(child2.dirWithoutAagam + `/`)).length"
                class="ol ol--3"
              >
                <li
                  v-for="child3 in groupedChildren['3'].filter(child => {
                return child.dirWithoutAagam.startsWith(child2.dirWithoutAagam + `/`);
                })"
                  :key="child3.paddedDepth"
                  class="list-item list-item--3"
                >
                  <details class="details details--3">

                    <summary class="summary summary--3 tw-group">

                      <nuxt-link
                        :to="child3.dirWithoutAagam"
                        class="link"
                      > {{child3.slugurl}} <span
                          v-if="child3.title"
                          class="post-title"
                        >({{child3.title}})</span>
                      </nuxt-link>
                      <span
                        class="contents-count"
                        v-if="groupedChildren['4'] && groupedChildren['4'].filter(child => child.dirWithoutAagam.startsWith(child3.dirWithoutAagam + `/`)).length"
                      >
                        {{groupedChildren['4'].filter(child => child.dirWithoutAagam.startsWith(child3.dirWithoutAagam + `/`)).length}} contents
                      </span>
                    </summary>

                    <ol
                      v-if="groupedChildren['4'] && groupedChildren['4'].filter(child => child.dirWithoutAagam.startsWith(child3.dirWithoutAagam + `/`)).length"
                      class="ol ol--4"
                    >
                      <li
                        v-for="child4 in groupedChildren['4'].filter(child => {
                      return child.dirWithoutAagam.startsWith(child3.dirWithoutAagam + '/')})"
                        :key="child4.paddedDepth"
                        :class="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length > 0 ? 'list-item list-item--4' : 'list-item-without-details-tag'"
                      >
                        <component
                          :is="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length > 0 ? 'details' : 'div'"
                          :class="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length > 0 ? 'details details--4' : null"
                        >

                          <component
                            :is="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length > 0 ? 'summary' : 'div'"
                            :class="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length > 0 ? 'summary summary--4 tw-group' : null"
                          >
                            <nuxt-link
                              :to="child4.dirWithoutAagam"
                              class="link"
                            > {{child4.slugurl}} <span
                                v-if="child4.title"
                                class="post-title"
                              >({{child4.title}})</span>

                            </nuxt-link>
                            <span
                              class="contents-count"
                              v-if="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length"
                            >
                              {{groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length}} contents
                            </span>
                          </component>
                          <ol
                            v-if="groupedChildren['5'] && groupedChildren['5'].filter(child => child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + `/`)).length"
                            class="ol ol--5"
                          >
                            <li
                              v-for="child5 in groupedChildren['5'].filter(child => {
                            return child.dirWithoutAagam.startsWith(child4.dirWithoutAagam + '/')})"
                              :key="child5.paddedDepth"
                              :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length > 0 ? 'list-item list-item--5' : 'list-item-without-details-tag'"
                            >

                              <component
                                :is="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length > 0 ? 'details' : 'div'"
                                :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length > 0 ? 'details details--5' : null"
                              >
                                <component
                                  :is="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length > 0 ? 'summary' : 'div'"
                                  :class="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length > 0 ? 'summary summary--5 tw-group' : null"
                                >
                                  <nuxt-link
                                    :to="child5.dirWithoutAagam"
                                    class="link"
                                  > {{child5.slugurl}} <span
                                      v-if="child5.title"
                                      class="post-title"
                                    >({{child5.title}})</span>
                                  </nuxt-link>
                                  <span
                                    class="contents-count"
                                    v-if="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length"
                                  >
                                    {{groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length}} contents
                                  </span>
                                </component>
                                <ol
                                  v-if="groupedChildren['6'] && groupedChildren['6'].filter(child => child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + `/`)).length"
                                  class="ol ol--6"
                                >
                                  <li
                                    v-for="child6 in groupedChildren['6'].filter(child => {
                                  return child.dirWithoutAagam.startsWith(child5.dirWithoutAagam + '/')})"
                                    :key="child6.paddedDepth"
                                  >

                                    <div class="">
                                      <nuxt-link
                                        :to="child6.dirWithoutAagam"
                                        class="link"
                                      > {{child6.slugurl}} <span
                                          v-if="child6.title"
                                          class="post-title"
                                        >({{child6.title}})</span>
                                      </nuxt-link>
                                    </div>
                                    <ol
                                      v-if="groupedChildren['7'] && groupedChildren['7'].filter(child => child.dirWithoutAagam.startsWith(child6.dirWithoutAagam + `/`)).length"
                                      class="ol ol--7"
                                    >
                                      <li
                                        v-for="child7 in groupedChildren['7'].filter(child => {
                                        return child.dirWithoutAagam.startsWith(child6.dirWithoutAagam + '/')})"
                                        :key="child7.paddedDepth"
                                      >
                                        <div class="">
                                          <nuxt-link
                                            :to="child7.dirWithoutAagam"
                                            class="link"
                                          > {{child7.slugurl}} <span
                                              v-if="child7.title"
                                              class="post-title"
                                            >({{child7.title}})</span>
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
          :to="child.to"
          class="link"
        > {{child.slugurl}}
        </nuxt-link>
      </li>
    </ol> -->
    </div>
  </div>
</template>

<script>
import groupBy from "lodash.groupby";

export default {
  name: "AagamTableOfContents",
  props: {},
  data() {
    return {
      children: [],
      groupedChildren: {}
    };
  },
  async fetch() {
    this.children = await this.$content(`aagam/${this.AagamName}`, {
      deep: true
    })
      .only([
        "paddedDepth",
        "slug",
        "show",
        "dirWithoutAagam",
        "slugurl",
        "title"
      ])
      .where({
        $and: [
          { paddedDepth: { $len: { $gt: 0 } } },
          { slug: "meta" },
          // { type: { $ne: "toc" } },
          { show: { $ne: false } }
        ]
      })
      .sortBy("paddedDepth", "asc")
      .fetch();

    // https://stackoverflow.com/questions/50566693/intl-collator-for-js-objects
    // let collator = new Intl.Collator(undefined, {
    //   numeric: true,
    //   sensitivity: "base"
    // });

    // if (this.children) {
    //   this.children = this.children.sort((a, b) => {
    //     return collator.compare(a.depth, b.depth);
    //   });
    // }
    if (this.children) {
      this.groupedChildren = groupBy(this.children, child => {
        return child.dirWithoutAagam.match(/\//g || []).length;
      });
    }
  },
  computed: {
    AagamName() {
      if (this.$route?.params?.pathMatch) {
        // Add a Trailing Slash because, for e.g., on http://localhost:3000/acharanga/ page, the pathMatch is "acharanga" (not "acharanga/")
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

/// The Text portion

.link
  @apply tw-inline tw-break-words tw-border-gray-100 hover:tw-border-linkpink tw-text-current hover:tw-text-linkpink

.post-title
  @apply tw-text-xs md:tw-text-sm

.contents-count
  @apply tw-text-xs md:tw-text-sm tw-inline-block tw-mr-auto tw-text-gray-400 group-hover:tw-text-gray-700

/// The HTML portion

.ol
  @apply tw-pl-2 tw-pr-1 tw-pt-2 md:tw-pl-4 md:tw-pt-0
  @apply tw-list-none tw-my-0

.list-item-without-details-tag
  @apply tw-px-1 tw-py-1 md:tw-py-2 first:tw-py-2 tw-border-b last:tw-border-b-0

.details
  @apply tw-my-3
  @apply tw-bg-gradient-to-br tw-from-white tw-via-white
  &--2
    @apply tw-to-pink-50 tw-border-pink-300
  &--3
    @apply tw-to-blue-50 tw-border-blue-300
  &--4
    @apply tw-to-green-50 tw-border-green-300
  &--5
    @apply tw-to-purple-50 tw-border-purple-300

.summary
  @apply tw-bg-gradient-to-r tw-shadow-md
  &--2
    @apply tw-to-pink-50 tw-text-pink-800 marker:tw-text-pink-600
  &--3
    @apply tw-to-blue-50 tw-text-blue-800 marker:tw-text-blue-700
  &--4
    @apply tw-to-green-50 tw-text-green-800 marker:tw-text-green-600
  &--5
    @apply tw-to-purple-50 tw-text-purple-800 marker:tw-text-purple-600

.details[open]
  .summary
    @apply tw-border-none

</style>