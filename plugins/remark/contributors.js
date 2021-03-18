
// https://content.nuxtjs.org/snippets#remark-plugin

module.exports = function () {
  const fetch = require('node-fetch')
  return async (tree, { data }) => {
    if (data.fetchContributors) {
      const contributors = await fetch(
        'https://api.github.com/repos/madrecha/jainaagam/contributors'
      ).then(res => res.json())
        .then(res => res.map(({ login }) => login))

      data.$contributors = [...new Set(contributors)]
      // console.log(data);
    }
    return tree
  }
}