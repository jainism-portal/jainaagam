<template>
  <div>
    <!-- <div v-if="metaPosts">
      {{metaPosts.length}}
      <div
        v-for="(metaPost, i) in metaPosts"
        :key="i"
      >
        <pre>
        {{ metaPost.langs }}
        </pre>
      </div>
    </div> -->
    <!-- <div v-if="langPosts">
      {{langPosts.length}}
      <div
        v-for="(langPost, i) in langPosts"
        :key="i"
      >
        <pre>
        {{ langPost }}
        </pre>
      </div>
    </div> -->
    <div v-if="routes">
      {{routes.length}}
      <div
        v-for="(route, i) in routes"
        :key="i"
      >
        <pre>
        {{ route}}
        </pre>
      </div>
    </div>
    {{routes.length}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      metaPosts: [],
      langPosts: [],
      allPosts: [],
      routes: []
    };
  },
  async fetch() {
    this.metaPosts = await this.$content("aagam", { deep: true })
      .without("body")
      .where({
        $and: [
          { slug: "meta" },
          {
            dirWithoutAagam: {
              $regex: `^` + `/acharanga` + `|` + `/sutrakritanga`
            }
          },
          { show: { $ne: false } }
        ]
      })
      .sortBy("paddedDepth", "asc")
      .sortBy("path", "asc")
      .fetch();

    for (const metaPost of this.metaPosts) {
      let langPostsOfDir = await this.$content("aagam", { deep: true })
        .without(["body", "toc"])
        .where({
          $and: [
            { dir: metaPost.dir },
            { slug: { $ne: "original" } },
            { slug: { $ne: "en" } },
            { slug: { $ne: "meta" } },
            { show: { $ne: false } }
          ]
        })
        .sortBy("langPosition")
        .fetch();

      // langPostsOfDir = langPostsOfDir.filter(post => post.length);

      this.langPosts.push(langPostsOfDir);
    }
    this.langPosts = this.langPosts.flat();

    this.metaPosts.map(metaPost => {
      metaPost.langs = [];

      for (const langPost of this.langPosts) {
        if (langPost.dir === metaPost.dir) {
          metaPost.langs.push(langPost.slug);
          metaPost.langs = [...new Set(metaPost.langs)];
          metaPost.langs = metaPost.langs.filter(
            lang => !lang.startsWith("sutra")
          );
        }
      }
      metaPost.langs.push("en", "x-default");
      return metaPost;
    });

    this.langPosts.map(langPost => {
      langPost.langs = [];

      for (const metaPost of this.metaPosts) {
        if (metaPost.dir === langPost.dir) {
          langPost.langs.push(metaPost.langs);
        }
      }
      langPost.langs = langPost.langs.flat();
      return langPost;
    });

    this.allPosts = [...this.metaPosts, ...this.langPosts];

    for (const post of this.allPosts) {
      post.langs = post.langs ? post.langs : [];

      this.routes.push({
        url:
          post.slug === "meta"
            ? `${post.dirWithoutAagam}/`
            : `${post.pathWithoutAagam}/`,
        changefreq: "daily",
        lastmod: post.updatedAt,
        links: post.langs.map(lang => {
          let url =
            lang === "en" || lang === "x-default"
              ? `${post.dirWithoutAagam}/`
              : `${post.dirWithoutAagam}/${lang}/`;

          return {
            lang: lang,
            url: url
          };
        })
      });
    }
  }
};
</script>

<style lang="sass" scoped>

</style>