import { visit } from 'unist-util-visit';

// This plugin repurposes the alt text specified for images to
// automatically generate captions for them. For example:
//
// ![This alt text will also appear as a caption](/img/example.png)
//
// The caption is injected as an <em> element in the output, which can
// then be styled using an `img + em` selector.
//
// Note that it's also possible to override the automated behavior
// of this plugin by proving a custom caption in an emphasis block
// immediately following the image in the markdown, e.g.
//
// ![Alt text, overridden by the caption below](/img/example.png)
// _A custom caption, which overrides the alt text above_

export default function captionPlugin() {
  return (ast) => {
    visit(ast, "paragraph", (node) => {
      if (
        node.children &&
        node.children.length === 1 && // exactly one child
        node.children[0].type === "image" && // that is an image
        node.children[0].alt // with a specified alt attribute
      ) {
        // Replace the existing paragraph node with a newly
        // constructed one which contains the original image node
        // and a new emphasis node containing its alt text.
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
}
