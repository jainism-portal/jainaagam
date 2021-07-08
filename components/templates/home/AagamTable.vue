<template>
  <table class="tw-my-6 tw-border-collapse tw-table-fixed">
    <thead>
      <tr>
        <th class="tw-w-1/12 tw-border">No.</th>
        <th class="tw-w-3/12 tw-border">Name</th>
        <th class="tw-w-5/12 tw-border">Trans</th>
        <th class="tw-w-3/12 tw-border">Original</th>
      </tr>
    </thead>
    <tbody v-if="aagams && cats">
      <template v-for="cat in cats">
        <tr class="tw-text-center">
          <td
            colspan="4"
            class="tw-border tw-capitalize tw-bg-gradient-to-br tw-from-white tw-to-yellow-100 tw-text-yellow-800"
          >
            <span class="tw-font-semibold tw-text-lg md:tw-text-2xl">
              {{cat.name}}</span> <span class="tw-text-sm md:tw-text-lg">({{cat.trans}})</span>
          </td>
        </tr>
        <AagamTableRow
          v-for="aagam in aagams.filter(aagam => aagam.cat === cat.name)"
          :key="aagam.link"
          :aagam="aagam"
        ></AagamTableRow>
      </template>
    </tbody>
  </table>
</template>

<script>
import { aagams, cats } from "~/app/aagams.js";

import AagamTableRow from "~/components/templates/home/AagamTableRow.vue";

export default {
  components: { AagamTableRow },
  data() {
    return {
      aagams: aagams,
      cats: cats
    };
  }
};
</script>