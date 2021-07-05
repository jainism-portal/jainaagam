<template>
  <div class="tw-text-gray-600">
    <p class="tw-my-3 tw-text-3xl">This page is yet to be added in English language.</p>
    <p class="tw-my-3">But no worries, we will soon add this page.</p>
    <p class="tw-my-3">Till then, you have these choices:
    </p>
    <ol class="tw-my-3 md:tw-my-6 tw-list-decimal tw-list-inside">
      <li class="tw-my-3">
        Just see below the title whether this page is available in alternate languages.
      </li>
      <li class="tw-my-3">
        OR View <strong>Table of Contents</strong> or the <strong>Original sutra</strong> page by clicking on their respective links above.
      </li>
      <li class="tw-my-3">OR If this page has Contents of its own above, you can surely visit them.</li>
      <li class="tw-my-3">
        OR simply go to <nuxt-link
          :to="`/`"
          class="!tw-text-linkblue hover:tw-underline"
        >Home Page</nuxt-link> to browse list of Jain Aagam
      </li>
    </ol>
    <div class="tw-border-t tw-pt-2 tw-my-3 md:tw-my-6">

      <p class="tw-my-3">Or better yet, why not add this page yourself in <b>a language of your choice</b> by clicking on Edit this page on Github link below.</p>
      <p class="tw-my-3">Or just let us know that you want this page to be added by us ASAP by
        <a
          :href="`https://github.com/jainism-portal/jainaagam/issues/new?title=incomplete: ${$route.path}`"
          target="_blank"
          rel="noopener noreferrer"
          class="!tw-text-linkblue hover:tw-underline"
        >creating an issue</a>
        <v-icon small>{{mdiOpenInNew}}</v-icon> on our Github repository of <a
          href="https://github.com/jainism-portal/jainaagam"
          target="_blank"
          rel="noopener"
          title="Jain Aagam Github repository"
          class="!tw-text-linkblue hover:tw-underline"
        >
          Jain Aagam
        </a>
        <v-icon small>{{mdiOpenInNew}}</v-icon>
      </p>
    </div>
  </div>
</template>

<script>
import { mdiOpenInNew } from "@mdi/js";
export default {
  data() {
    return {
      mdiOpenInNew
    };
  }
};
</script>