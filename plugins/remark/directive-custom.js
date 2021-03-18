const visit = require('unist-util-visit')
const h = require('hastscript')

module.exports = function () {
  // console.log(info)
  return function transformer(tree, file) {
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      ondirective
    );
    function ondirective(node) {
      var data = node.data || (node.data = {});
      var hast = h(node.name, node.attributes);

      data.hName = hast.tagName;
      data.hProperties = hast.properties;
    }
  }
};
