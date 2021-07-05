const fetch = require('node-fetch')

module.exports = function () {
  return async (tree, { data }) => {
    if (data.type === 'releases') {
      let releases = [], release = {};
      await fetch(
        "https://api.github.com/repos/jainism-portal/jainaagam/releases"
      )
        .then(res => res.json())
        .then(
          res =>
          (releases = res
            .filter(r => !r.draft)
            .map(release => {
              return {
                url: release.html_url,
                name: release.name,
                tagName: release.tag_name,
                createdAt: release.created_at,
                publishedAt: release.published_at,
                body: release.body
              };
            }))
        );

      // if (releases.length) {
      //   release = releases.filter(
      //     release => release.tagName === data.tagName
      //   );
      // }
      // release = releases ? releases[0] : {};
      data.$releases = releases
    }
    return tree
  }
}