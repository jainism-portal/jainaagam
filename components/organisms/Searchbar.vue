<template>
  <div class="tw-relative">
    <header class="tw-flex tw-shadow-md tw-py-1">
      <div class="tw-w-1/4 tw-flex tw-justify-around">
        <button @click.prevent="showSearch">Comm</button>
        <button @click.prevent="showSearch">Mag</button>
      </div>

      <center class="tw-w-3/4 tw-flex tw-justify-around">
        <input
          v-if="showCommerce === true"
          class="tw-rounded tw-ring"
          v-model="query"
          type="search"
          autocomplete="off"
          placeholder="Commerce..."
        />
        <input
          v-if="showMagazines === true"
          class="tw-rounded tw-ring"
          v-model="magquery"
          type="search"
          autocomplete="off"
          placeholder="Magazines..."
        />
      </center>
    </header>

    <ul
      v-if="posts.length"
      class="tw-absolute tw-top-8 tw-z-30 tw-bg-white tw-list-decimal tw-pl-2"
    >
      <li
        v-for="post of posts"
        :key="post.slug"
        class="tw-border-b tw-border-gray-400 tw-p-1"
      >
        <NuxtLink :to="`${post.path}`">{{ post.title ? post.title : post.slug }}</NuxtLink>
      </li>
    </ul>
    <ul
      v-if="magazines.length"
      class="tw-absolute tw-top-8 tw-z-30 tw-bg-white tw-list-decimal tw-pl-2"
    >
      <li
        v-for="magazine of magazines"
        :key="magazine.slug"
        class="tw-border-b tw-border-gray-400 tw-p-1"
      >
        <NuxtLink :to="`${magazine.path}`">{{ magazine.title ? magazine.title : magazine.slug }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      magquery: "",
      posts: [],
      magazines: [],
      showCommerce: true,
      showMagazines: false
      // showList: false
    };
  },
  methods: {
    // Mobile Nav
    clickOutsideHandler() {
      if (this.showList) {
        this.showList = false;
      }
    },
    showSearch() {
      if (this.showCommerce === true && this.showMagazines === false) {
        this.showCommerce = false;
        this.posts.length = 0;
        this.showMagazines = true;
        return;
      } else if (this.showCommerce === false && this.showMagazines === true) {
        this.showCommerce = true;
        this.magazines.length = 0;
        this.showMagazines = false;
        return;
      } else if (this.showCommerce === false && this.showMagazines === false) {
        this.showCommerce = false;
        this.posts.length = 0;
        this.showMagazines = true;
        return;
      }
    }
  },
  watch: {
    async query(query) {
      if (!query) {
        this.posts = [];
        return;
      }

      this.posts = await this.$content("commerce", { deep: true })
        .without(["body", "toc"])
        .sortBy("slug", "asc")
        .limit(20)
        .search("text", query)
        .fetch();
    },

    async magquery(magquery) {
      if (!magquery) {
        this.magazines = [];
        return;
      }

      this.magazines = await this.$content("magazines", { deep: true })
        .without(["body", "toc"])
        .sortBy("slug", "asc")
        .limit(20)
        .search("text", magquery)
        .fetch();
    }
  }
};
</script>