<template>
  <div>
    <NuxtContent :document="content_aagamindex[0]"></NuxtContent>

    <h2>List of Jain Aagams</h2>
    <h3>Anga</h3>
    <ol class="tw-list-inside">
      <li v-for="aagam in anga" :key="aagam.title">
        <nuxt-link :to="`/aagam/${aagam.title}`">
          {{ aagam.title }}
          <span v-if="aagam.names"
            ><span v-for="(name, i) in aagam.names" :key="i"
              ><span v-if="name.sanskrit">({{ name.sanskrit }})</span></span
            ></span
          >
        </nuxt-link>
      </li>
    </ol>
    <h3>Upanga</h3>
    <ol class="tw-list-inside">
      <li v-for="aagam in upanga" :key="aagam.title">
        <nuxt-link :to="`/aagam/${aagam.title}`">
          {{ aagam.title }}
          <span v-if="aagam.names"
            ><span v-for="(name, i) in aagam.names" :key="i"
              ><span v-if="name.sanskrit">({{ name.sanskrit }})</span></span
            ></span
          >
        </nuxt-link>
      </li>
    </ol>
    <h3>Mool</h3>
    <ol class="tw-list-inside">
      <li v-for="aagam in mool" :key="aagam.title">
        <nuxt-link :to="`/aagam/${aagam.title}`">
          {{ aagam.title }}
          <span v-if="aagam.names"
            ><span v-for="(name, i) in aagam.names" :key="i"
              ><span v-if="name.sanskrit">({{ name.sanskrit }})</span></span
            ></span
          >
        </nuxt-link>
      </li>
    </ol>
    <h3>Mool</h3>
    <ol class="tw-list-inside">
      <li v-for="aagam in chhed" :key="aagam.title">
        <nuxt-link :to="`/aagam/${aagam.title}`">
          {{ aagam.title }}
          <span v-if="aagam.names"
            ><span v-for="(name, i) in aagam.names" :key="i"
              ><span v-if="name.sanskrit">({{ name.sanskrit }})</span></span
            ></span
          >
        </nuxt-link>
      </li>
    </ol>
    <h3>Prakeerna</h3>
    <ol class="tw-list-inside">
      <li v-for="aagam in prakeerna" :key="aagam.title">
        <nuxt-link :to="`/aagam/${aagam.title}`">
          {{ aagam.title }}
          <span v-if="aagam.names"
            ><span v-for="(name, i) in aagam.names" :key="i"
              ><span v-if="name.sanskrit">({{ name.sanskrit }})</span></span
            ></span
          >
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // aagams: [],
      aagam_list: null,
      content_aagamindex: null,
      anga: [],
      upanga: [],
      mool: [],
      chhed: [],
      prakeerna: [],
    };
  },
  async fetch() {
    // const _ = require("lodash");
    // this.aagams = await this.$content("hi/aagam", { deep: true })
    //   .where({ type: "aagam" })
    //   .fetch();
    // this.aagams = _.sortBy(this.aagams, ["order.aagam.position", "title"]);

    this.content_aagamindex = await this.$content("hi/aagam", { deep: true })
      .where({ type: "aagam_index" })
      .fetch();

    // List of all aagams
    this.aagam_list = await this.$content("aagam-meta", "aagam-list").fetch();

    this.anga = this.aagam_list.aagams.filter((aagam) => {
      return aagam.type === "anga";
    });

    // this.upanga =

    // this.mool =

    // this.chhed

    // this.prakeerna =
  },
};
</script>