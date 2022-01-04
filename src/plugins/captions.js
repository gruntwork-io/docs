const visit = require("unist-util-visit")

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, "paragraph", (node) => {
      if (
        node.children &&
        node.children.length === 1 && // exactly one child
        node.children[0].type === "image" && // that is an image
        node.children[0].alt // with a specified alt attribute
      ) {
        // replace the existing paragraph node with a newly
        // constructed one which contains the origin image node
        // and a new emphasis node containing its alt text
        return Object.assign(node, {
          type: "paragraph",
          children: [
            node.children[0],
            {
              type: "emphasis",
              children: [
                {
                  type: "text",
                  value: node.children[0].alt,
                },
              ],
            },
          ],
        })
      }
    })
  }
  return transformer
}

module.exports = plugin
