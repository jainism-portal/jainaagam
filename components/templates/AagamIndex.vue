<template>
  <div>
    <ol class="!tw-list-none">
      <li
        v-for="child in children"
        :key="child.path"
        :class="child.path.match((/\//g) || []).length === 5 ? 'tw-pl-0' 
        : child.path.match((/\//g) || []).length === 6 ? 'tw-pl-4' 
        : child.path.match((/\//g) || []).length === 7 ? 'tw-pl-8' 
        : child.path.match((/\//g) || []).length === 8 ? 'tw-pl-12' 
        : child.path.match((/\//g) || []).length === 9 ? 'tw-pl-16' 
        : child.path.match((/\//g) || []).length === 10 ? 'tw-pl-20' 
        : child.path.match((/\//g) || []).length === 11 ? 'tw-pl-24' 
        : null"
      >
        <nuxt-link
          :to="child.path"
          class="tw-inline-block tw-capitalize tw-p-0.5 tw-my-0.5 hover:tw-bg-blue-50 hover:tw-text-blue-600"
        > {{child.slug}}
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      post: null,
      posts: [],
      children: []
    };
  },
  async fetch() {
    this.posts = await this.$content(this.$i18n.locale, {
      deep: true
    })
      .without(["body"])
      .where({
        path: this.$route.path.slice(0, -6) // The 6 denotes "index/"
      })
      .fetch();

    this.post = this.posts[0];

    this.children = await this.$content(this.$i18n.locale, {
      deep: true
    })
      .where({
        $and: [
          { path: { $regex: ["^" + this.post.path + "[a-z]+"] } },
          { show: { $ne: false } },
          { type: { $ne: "toc" } }
        ]
      })
      .sortBy("path")
      // .sortBy("position")
      .fetch();
  }
};
</script>

<style lang="sass" scoped>

</style>