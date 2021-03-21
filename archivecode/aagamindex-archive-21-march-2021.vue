<template>
  <div class="tw-prose lg:tw-prose-lg tw-prose-green tw-max-w-none">
    <NuxtContent :document="content_aagamindex"></NuxtContent>

    <h2>List of 45 Jain Aagams</h2>
    <div>
      <div v-for="item in Object.keys(list)" :key="item">
        <h3>{{ item }}</h3>
        <div
          v-for="(items, i) in Object.values([list[item]])"
          :key="(items, i)"
        >
          <ol class="tw-list-inside">
            <li v-for="item in items" :key="item.slugurl">
              <nuxt-link :to="`/aagam/${item.slugurl}`">
                {{ item.title }}
                <span v-if="item.names"
                  ><span v-for="(name, i) in item.names" :key="i"
                    ><span v-if="name.sanskrit"
                      >({{ name.sanskrit }})</span
                    ></span
                  ></span
                >
              </nuxt-link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // aagams: [],
      aagam_list: null,
      content_aagamindex: null,
      // anga: [],
      // upanga: [],
      // mool: [],
      // chhed: [],
      // prakirnaka: [],
      // chulika: [],
      list: [],
    };
  },
  async fetch() {
    const _ = require("lodash");

    // this.aagams = await this.$content("hi/aagam", { deep: true })
    //   .where({ type: "aagam" })
    //   .fetch();
    // this.aagams = _.sortBy(this.aagams, ["order.aagam.position", "title"]);

    this.content_aagamindex = await this.$content("hi/aagam", { deep: true })
      .where({ type: "aagam_index" })
      .fetch();

    this.content_aagamindex = this.content_aagamindex[0];

    // List of all aagams
    this.aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    // this.anga = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "anga";
    // });

    // this.upanga = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "upanga";
    // });

    // this.mool = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "mool";
    // });

    // this.chhed = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "chhed";
    // });

    // this.prakirnaka = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "prakirnaka";
    // });

    // this.chulika = this.aagam_list.aagams.filter((i) => {
    //   return i.cat === "chulika";
    // });

    this.list = _.groupBy(this.aagam_list.aagams, (i) => {
      return i.cat;
    });
  },
};
</script>