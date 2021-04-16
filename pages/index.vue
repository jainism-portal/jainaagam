<template>
  <div class="tw-text-base md:tw-text-lg ">
    <div class="tw-max-w-screen-lg tw-mx-auto md:tw-flex">
      <section class="tw-px-4 tw-mt-8">
        <center>
          <h1 class="tw-text-3xl md:tw-text-5xl tw-my-4 tw-font-medium tw-text-gray-900">Jain Aagam
          </h1>
          <p class="tw-mb-8 tw-leading-relaxed tw-text-gray-600 ">Jain Aagam are Jainism's supreme religious scriptures that deal with metaphysics, soul, life advice, and spiritualism.<br>
            They were compiled over two thousand years ago in North India.</p>
        </center>
        <section class="tw-flex tw-justify-center">
          <button class="tw-text-white tw-bg-pink-500 tw-py-2 px-6 focus:tw-outline-none hover:tw-bg-pink-600 tw-rounded tw-text-lg">
            <nuxt-link :to="`/${$i18n.locale}/aagam`">
              {{ $t("aagam") }}
            </nuxt-link>
          </button>
          <button class="tw-ml-4 tw-text-gray-700 tw-bg-gray-200 tw-py-2 tw-px-6 focus:tw-outline-none hover:tw-bg-gray-400 tw-rounded tw-text-lg"><a
              href="https://github.com/jainism-portal/jainaagam"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </button>
        </section>
      </section>
      <section class="tw-mt-8 tw-w-3/4 tw-mx-auto tw-flex tw-justify-center tw-items-center nuxt-content">
        <center class="tw-bg-yellow-50 tw-p-4 tw-shadow-xl tw-rounded-2xl">
          <p class="tw-font-medium">This is a Work in Progress project. </p>
          <p>You are more than welcome to contribute to this humungous venture. </p>
          <p>Here, we aim to consolidate all the Jain Aagam with their millions of aphormisms (sutra), along with meaning and explanation on Internet.</p>
          <p>Currently, there are Jain websites that serve only PDFs of Jain Aagam, but there is no website that provides searchable and indexable contents of Jain Aagam, that too in multiple languages. We aim to be the first among them.</p>
        </center>
      </section>
    </div>
    <section>
      .
    </section>
  </div>
</template>

<script>
export default {};
</script>
