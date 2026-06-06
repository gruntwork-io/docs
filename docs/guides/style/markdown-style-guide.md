---
toc_max_heading_level: 2
---

import Admonition from "@theme/Admonition"
import { CCLicense } from "/src/components/CCLicense"

# Markdown style guide

<!--

NOTE TO EDITORS: Some of the code-fenced examples in this document specify
`plain` instead of `markdown` as the language. This is done purposefully to
avoid auto-formatting by IDEs of examples intended to demonstrate incorrect
Markdown syntax.

(`plain` is not a supported language and has no effect other than to signify
in context that it's an explicit choice rather than an error of omission.)

-->

Much of what makes Markdown great is the ability to write plain text and get great formatted output as a result. We want to keep our source Markdown as simple and consistent as possible to make it easier for our many authors to contribute to Gruntwork documentation over time. It’s much easier to understand and make edits to a large collection of docs when they all share a consistent style.

We seek to balance three goals:

1. **Legibility.** Source text is readable and portable.
2. **Maintainability.** Markdown files are maintainable over time and across teams.
3. **Simplicity.** The syntax is simple and easy to remember.

## Document structure

### General outline

In general, most documents benefit from some variation of the following layout:

```markdown
# Document Title

Short introduction.

## Topic

Content.

## Another Topic

More content.
```

1.  `# Document Title`: The first heading should be a level one heading, and
    should ideally be the same or nearly the same as the filename. The first
    level one heading is used as the page `<title>`. In nearly all cases, you
    should only include _one_ level one heading in the file.

1.  `Short introduction.` 1-3 sentences providing a high-level overview of the
    topic. Imagine yourself as a complete newbie, who landed on your "Extending
    Foo" doc and needs to know the most basic assumptions you take for granted.
    "What is Foo? Why would I extend it?"

1.  `## Topic`: The rest of your headings should start from level 2.

### Table of contents

Markdown doesn't include native syntax for a table of contents. While a TOC
can help readers find relevant content on longer pages more easily, they are
difficult to maintain and can easily get out of sync with the content.

Because both GitHub (where our code and READMEs are hosted) and Docusaurus
(where our documentation is hosted) provide an auto-generated table of contents
based on the headers in the document, you should generally omit a TOC from
your document and rely on the rendering context to provide one.

You may make an exception to this rule in order to provide smaller, inline TOCs
which enumerate only the items within a given section of the document, as a
means of introducing what comes next.

### Intermediate line breaks

Unless otherwise indicated, all markdown elements in your document should be
separated by exactly one blank line. Preserving a small gap makes it easier
to identify individual elements in the source. However, avoid using multiple
blank lines as this can lead to inconsistent spacing and longer source files.

### Character line limit

Obey projects' character line limit wherever possible. Long URLs and tables are
the usual suspects when breaking the rule. (Headings also can't be wrapped, but
we encourage keeping them short). Unless instructed otherwise, wrap your text
to 120 characters:

```markdown
Lorem ipsum dolor sit amet, nec eius volumus patrioque cu, nec et commodo
hendrerit, id nobis saperet fuisset ius.

- Malorum moderatius vim eu. In vix dico persecuti. Te nam saperet percipitur
  interesset. See the [foo docs](https://gerrit.googlesource.com/gitiles/+/master/Documentation/markdown.md).
```

Often, inserting a newline before a long link preserves readability while
minimizing the overflow:

```markdown
Lorem ipsum dolor sit amet. See the
[foo docs](https://gerrit.googlesource.com/gitiles/+/master/Documentation/markdown.md)
for details.
```

### Ending newline

All files should end with a single empty line to avoid
[any potential tool incompatibilities](https://unix.stackexchange.com/questions/18743/whats-the-point-in-adding-a-new-line-to-the-end-of-a-file).
But, let's be honest — do it because we don't like seeing
`\ No newline at end of file` in our diffs.

## Paragraphs

To create paragraphs, use a single blank line to separate one or more lines of
text.

```markdown title="✅ DO THIS"
This is a paragraph. Make it as long as you want,
and wrap text as needed.

This is the beginning of a second paragraph.
```

Don't indent the first line of a paragraph unless it part of a [list](#lists).
This can cause unexpected formatting issues, and makes it harder to read.

```plain title="⛔️ DON'T DO THIS"
    The first line of this paragraph is indented, which may
cause it to be interpreted incorrectly.
```

### No trailing whitespace

Don't use trailing whitespace, use a trailing backslash.

The [CommonMark spec](http://spec.commonmark.org/0.20/#hard-line-breaks) decrees
that two spaces at the end of a line should insert a `<br />` tag. However, many
directories have a trailing whitespace presubmit check in place, and many IDEs
will clean it up anyway.

Best practice is to avoid the need for a `<br />` altogether. Markdown creates
paragraph tags for you simply with newlines: get used to that.

## Headings

### ATX-style headings

```markdown title="✅ DO THIS"
## Heading 2
```

Headings with `=` or `-` underlines can be annoying to maintain and don't fit
with the rest of the heading syntax. The user has to ask: Does `---` mean H1 or
H2?

```plain title="⛔️ DON'T DO THIS"
Heading - do you remember what level?
---
```

### Add spacing to headings

Prefer a single space after `#` and newlines before and after:

```markdown title="✅ DO THIS"
...text before.

# Heading 1

Text after...
```

Lack of spacing makes it a little harder to read in source:

```markdown title="⛔️ DON'T DO THIS"
...text before.

#Heading 1
Text after...
```

## Emphasis

### Double asterisks for bold text

For clarity, always bold text by surrounding it with double asterisks. This also ensures that it works properly when attempting to bold a portion of a longer word.

```markdown title="✅ DO THIS"
**bold text**
```

Avoid using double underscores for bold text, as it's harder to distinguish from italics at a glance.

```plain title="⛔️ DON'T DO THIS"
__This is also bold.__
```

### Single underscores for italics

For clarity, always italicize text by surrounding it with single underscores.

```markdown title="✅ DO THIS"
_italicized text_
```

Avoid using single asterisks for italicized text, as it's harder to distinguish from bold text at a glance.

```plain title="⛔️ DON'T DO THIS"
*This is also italicized.*
```

## Lists

### Dashes for bulleted lists

Prefer dashes (-) for all bulleted lists over asterisks (\*) or plus signs (+).

```markdown title="✅ DO THIS"
- Foo.
- Bar.
- Baz.
```

They're a touch easier to type and make it easier to recognize what's going
on if the list item opens with bold text. This has reasonable legibility:

```markdown title="✅ DO THIS"
- **Foo.** foo foo
- **Bar.** bar bar
- **Baz.** baz baz
```

Whereas this does not:

```plain title="⛔️ DON'T DO THIS"
* **Foo.** foo foo
* **Bar.** bar bar
* **Baz.** baz baz
```

### Lazy numbering for long lists

Markdown is smart enough to let the resulting HTML render your numbered lists
correctly. For longer lists that may change, especially long nested lists, use
"lazy" numbering:

```markdown
1.  Foo.
1.  Bar.
    1.  Foofoo.
    1.  Barbar.
1.  Baz.
```

However, if the list is small and you don't anticipate changing it, prefer fully
numbered lists, because it's nicer to read in source:

```markdown
1.  Foo.
2.  Bar.
3.  Baz.
```

### Consistent indentation

When nesting lists, use a 4 space indent for both numbered and bulleted lists:

```plain title="✅ DO THIS"
1.  Two spaces after a numbered list.
    Four space indent for wrapped text.
2.  Two spaces again.

-   Three spaces after a bullet.
    Four space indent for wrapped text.
    1.  Two spaces after a numbered list.
        Eight space indent for the wrapped text of a nested list.
    2.  Looks nice, right?
-   Three spaces after a bullet.
```

The following works, but it's very messy:

```plain title="⛔️ DON'T DO THIS"
- One space,
with no indent for wrapped text.
    1. Irregular nesting...
```

Even when there's no nesting, using the 4 space indent makes layout consistent
for wrapped text:

```plain
-   Foo,
    wrapped.

1.  Two spaces after the numeral,
    and four space indenting.
2.  Two spaces again.
```

However, when lists are small, not nested, and a single line, one space can
suffice for both kinds of lists:

```markdown
- Foo
- Bar
- Baz

1. Foo
2. Bar
```

### Inter-item spacing

For lists with concise items most or all of which fit on one line, _do not_ leave
an empty line between list items:

```markdown title="✅ DO THIS"
- Foo
- Bar
- Baz
```

Leaving gaps like this produces gaps in the rendered output also, which leads to
lists which appear to lack structure:

```markdown title="⛔️ DON'T DO THIS"
- Foo

- Bar

- Baz
```

However, if many of your list items are longer and wrap onto multiple lines, a
blank line between list items improves legibility by making it easy to see
where each one begins:

```markdown title="✅ DO THIS"
1.  This is a list item that's long enough to wrap onto multiple lines when
    rendered on the page.

2.  In circumstances like these, it's helpful to leave a blank line between each
    list item to help distinguish one from the next and improve legibility in
    both the source and the output.

3.  A third list item helps make the point, even if it doesn't wrap itself.
```

```markdown title="⛔️ DON'T DO THIS"
1.  This is a list item that's long enough to wrap onto multiple lines when
    rendered on the page.
2.  In circumstances like these, it's helpful to leave a blank line between each
    list item to help distinguish one from the next and improve legibility in
    both the source and the output.
3.  A third list item helps make the point, even if it doesn't wrap itself.
```

## Code

### Inline

&#96;Backticks&#96; designate `inline code`, and will render all wrapped content
literally. Use them for short code quotations and field names:

```markdown
You'll want to run `really_cool_script.sh arg`.

Pay attention to the `foo_bar_whammy` field in that table.
```

Use inline code when referring to file types in an abstract sense, rather than a
specific file:

```markdown
Be sure to update your `README.md`!
```

Backticks are the most common approach for "escaping" Markdown metacharacters;
in most situations where escaping would be needed, code font just makes sense
anyway.

### Codeblocks

For code quotations longer than a single line, use a codeblock:

    ```python
    def Foo(self, bar):
      self.bar = bar
    ```

#### Declare the language

It is best practice to explicitly declare the language, so that neither the
syntax highlighter nor the next editor must guess.

#### Indented codeblocks are sometimes cleaner

Four-space indenting is also interpreted as a codeblock. These can look
cleaner and be easier to read in source, but there is no way to specify the
language. We encourage their use when writing many short snippets:

```markdown
You'll need to run:

    bazel run :thing -- --foo

And then:

    bazel run :another_thing -- --bar

And again:

    bazel run :yet_again -- --baz
```

#### Escape newlines

Because most commandline snippets are intended to be copied and pasted directly
into a terminal, it's best practice to escape any newlines. Use a single
backslash at the end of the line:

    ```shell
    bazel run :target -- --flag --foo=longlonglonglonglongvalue \
    --bar=anotherlonglonglonglonglonglonglonglonglonglongvalue
    ```

#### Nest codeblocks within lists

If you need a codeblock within a list, make sure to indent it so as to not break
the list:

````markdown
- Bullet.

  ```c++
  int foo;
  ```

- Next bullet.
````

You can also create a nested code block with 4 spaces. Simply indent 4
additional spaces from the list indentation:

```markdown
- Bullet.

      int foo;

- Next bullet.
```

## Blockquotes

### Include `>` on every line

To create a blockquote, add a `>` in front of _each_ line of a content block,
(including any blank lines):

```markdown title="✅ DO THIS"
> Our mission at Gruntwork is to make it 10x easier to understand, build, and
> deploy software.
```

```markdown title="✅ DO THIS"
> Your Entire Infrastructure.
>
> Defined as code.
>
> In about a day.
```

Don't omit the `>` even in contexts where the Markdown syntax supports it, such
as a single paragraph. Including it on each line improves clarity in the source
and retains consistency with multi-paragraph blockquotes or those that contain
formatted content like lists, which require it.

```plain title="⛔️ DON'T DO THIS"
> Our mission at Gruntwork is to make it 10x easier to understand, build, and
deploy software.
```

## Admonitions

Use admonitions to call attention to particular details within the body of a
doc, such as a cautionary warning, or a bit of supplemental information that
isn’t essential to its primary reading. Our documentation supports a custom
syntax for this purpose. Below, we also provide a means of
[simulating admonitions](#simulated-admonitions) in native Markdown syntax.

### Docusaurus admonitions

Docusaurus admonitions come in several flavors depending on the type or
severity of the information being communicated: `note`, `tip`, `info`,
`caution`, and `danger`.

Use the following custom syntax in documentation:

```markdown
:::note

Keep in mind that…

:::
```

You can also provide a custom title:

```markdown
:::tip Did you know…

I'll bet you didn't!

:::
```

See [the Docusaurus documentation](https://docusaurus.io/docs/markdown-features/admonitions)
for additional details.

### Simulated admonitions

When writing Markdown that won't appear in our documentation site the above
syntax will be rendered in plain text. In such cases, you can approximate the
same appearance using a blockquote with bold text on the first line:

```markdown title="✅ DO THIS"
> **NOTE**
>
> This text appears like a callout on the page.
```

:::note

When a simulated admonition of this kind is imported into our documentation,
it will be automatically translated into the Docusaurus admonition syntax and
appear rendered in the same style.

:::

Feel free to use phrasing like "Note that…" in the body of a paragraph, but
avoid using it to open a paragraph with a colon:

```markdown title="⛔️ DON'T DO THIS"
Note: This text won't appear with any custom styling.
```

## Expandable details

Although you should generally [avoid HTML](#strongly-prefer-markdown-to-html),
the `<details>` element enables readers to expand and collapse sections of content
on the page. This is useful when content needs to be made available, but
needn't be presented in the default view of the page where it could make it
needlessly long or distract from the main message.

You may use this native HTML element directly in your Markdown, as it is
supported by both
[GitHub](https://gist.github.com/scmx/eca72d44afee0113ceb0349dd54a84a2) and
[Docusuarus](https://docusaurus.io/docs/markdown-features#details):

```
<details>
<summary>Details toggle example</summary>

Expandable markdown content. Take note of:

1. The blank line above this content
2. The blank line below this content

</details>
```

Use an informative title in the summary to make clear what it contains.
In order to utilize Markdown within the body, ensure that you leave a
blank line both after the summary and before the closing `</details>` tag.

## Links

Use inline links within your document. This makes it easier for authors to
see where a link leads in context. However, long links make source Markdown
difficult to read and can break the line limit. _Wherever possible, shorten
your links_.

### Use informative link titles

Markdown link syntax allows you to set a link title, just as HTML does. Use it
wisely.

Titling your links as "link" or "here" tells the reader precisely nothing when
quickly scanning your doc and is a waste of space:

```markdown title="⛔️ DON'T DO THIS"
See the syntax guide for more info: [link](syntax_guide.md).
Or, check out the style guide [here](style_guide.md).
```

Instead, write the sentence naturally, then go back and wrap the most
appropriate phrase with the link:

```markdown title="✅ DO THIS"
See the [syntax guide](syntax_guide.md) for more info.
Or, check out the [style guide](style_guide.md).
```

### Avoid bare links

Avoid bare links without any syntax, as these won't be rendered reliably in
all contexts:

```markdown title="⛔️ DON'T DO THIS"
This is a bare link to https://docs.gruntwork.io.
```

If you wish to present a link as its own link text, wrap it in angle brackets:

```markdown title="✅ DO THIS"
This is a proper link to [https://docs.gruntwork.io](https://docs.gruntwork.io)
```

If you're using the text of a link purely informatively and _do not want it to
function as a link_, use backticks to treat it as inline code:

```markdown
This link to `https://docs.gruntwork.io` is for informational purposes only.
```

## Images

Feel free to use images to support your text. Diagrams and illustrations can
aid visual learners and help explain difficult concepts; and screenshots can
provide clarity when explaining how to interact with software. However, avoid
superfluous imagery or photography that doesn't directly help you communicate
your message.

### Provide Alt Text

Always specify alt text for your images to improve accessibility by providing
text in the brackets preceding the link:

```markdown title="✅ DO THIS"
![Describe the image briefly](/img/path/to/image.png)
```

Omitting the alt text is bad for accessibility.

```markdown title="⛔️ DON'T DO THIS"
![](/img/path/to/image.png)
```

### Captions

Markdown doesn't support captions natively. However, you can approximate
captions by placing [italicized text](#emphasis) on the line _immediately
after_ your image (omit a blank line). This provides basic formatting that
looks good in most Markdown rendering contexts, and also enables custom
styling in our documentation platform.

```markdown
![Describe the image briefly](/img/path/to/image.png)
_This is a custom caption_
```

:::note

In documentation, you don't need to supply a caption unless you want it to
differ from the provided alt text. The documentation platform will
automatically create a caption using the alt text for you, which you can
then override by using the technique described above.

:::

### Zooming

Our documentation platform automatically enables a feature which allows users
to zoom in on an image with a click. Disable this feature for any images which
don't require it, or have sufficiently small size/resolution so as to make
the resulting scaled image unhelpful.

To do so, surround the image syntax itself in underscores:

```markdown
_![This image cannot be zoomed](/img/path/to/image.png)_
```

:::note

Currently, automatic captions are not supported on images which can't be zoomed.

:::

## Horizontal rules

Avoid horizontal rules when possible. Instead, focus on creating a clean
outline using multi-level headers. If you need to isolate a section
of content, consider linking to it on a separate page.

When you do decide to use a horizontal rule, always use three dashes (---) on a
line by themselves, surrounded by blank lines. Don't use three underscores
(\_\_\_) or three asterisks (\*\*\*).

```markdown title="✅ DO THIS"
Always put a blank line before…

---

…and after a horizontal rule.
```

Using mixed characters and/or omitting spaces makes rules harder to identify.

```plain title="⛔️ DON'T DO THIS"
Without a gap…
***
…the rule is harder to spot.
```

## Tables

Any tables in your Markdown should be small. Large, complex tables are difficult
to read in source and most importantly, _a pain to modify later_ (although
[online tools](https://www.tablesgenerator.com/markdown_tables) and IDE features
like those for [Vim](https://github.com/dhruvasagar/vim-table-mode) and
[VSCode](https://github.com/rpeshkov/vscode-text-tables) can help).

Keep two considerations in mind when deciding if a table is appropriate:

1.  **Number of columns.** Tables with too many columns can exceed the width of
    text editors, causing individual rows to wrap onto multiple lines and making
    them virtually impossible to read in the source. _Prefer tables with only a
    few columns._

2.  **Length of cell content.** Text within cells can't wrap, so even short
    sentences in any of your cells can cause the width of the table to explode
    quicky. _Prefer tables with concise data._

### Consider lists for complex content

[Lists](#lists) and subheadings often suffice to present the same information
in a slightly less compact, though much more edit-friendly way. This can also
keep all relevant information for a particular item visible to readers at once,
without requiring horizontal scrolling.

```markdown title="✅ DO THIS"
## Fruits

### Apple

- [Juicy](https://SomeReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongURL)
- Firm
- Sweet

Apples keep doctors away.

### Banana

- [Convenient](https://example.com/SomeDifferentReallyReallyReallyReallyReallyReallyReallyReallyLongQuery)
- Soft
- Sweet

Contrary to popular belief, most apes prefer mangoes.
```

```markdown title="⛔️ DON'T DO THIS"
| Fruit  | Attribute                                                                                                             | Notes                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Apple  | [Juicy](https://example.com/SomeReallyReallyReallyReallyReallyReallyReallyReallyLongQuery), Firm, Sweet               | Apples keep doctors away.                             |
| Banana | [Convenient](https://example.com/SomeDifferentReallyReallyReallyReallyReallyReallyReallyReallyLongQuery), Soft, Sweet | Contrary to popular belief, most apes prefer mangoes. |
```

However, there are times when a small table is called for:

```markdown
| Transport        | Favored by     | Advantages                    |
| ---------------- | -------------- | ----------------------------- |
| Swallow          | Coconuts       | Otherwise unladen             |
| Bicycle          | Miss Gulch     | Weatherproof                  |
| X-34 landspeeder | Whiny farmboys | Cheap since the X-38 came out |
```

### Use reference style links

Use reference style links in tables to keep the contents of each cell as short
as possible. Include the link definitions immediately beneath the table (not
at the end of the file) where readers can find them in context.

```markdown title="✅ DO THIS"
| Fruit  | Attribute                    | Notes                          |
| ------ | ---------------------------- | ------------------------------ |
| Apple  | [Juicy][1], Firm, Sweet      | Apples keep doctors away.      |
| Banana | [Convenient][2], Soft, Sweet | Actually, apes prefer mangoes. |

[1]: https://SomeReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongURL
[2]: https://example.com/SomeDifferentReallyReallyReallyReallyReallyReallyReallyReallyLongQuery
```

## Strongly prefer Markdown to HTML

Please prefer standard Markdown syntax wherever possible and avoid HTML hacks.
If you can't seem to accomplish what you want, reconsider whether you really
need it. Except for [big tables](#consider-lists-for-complex-content), Markdown meets almost
all needs already.

Every bit of HTML or Javascript hacking reduces the readability and portability.
This in turn limits the usefulness of integrations with
other tools, which may either present the source as plain text or render it.

<CCLicense license="by">

This Markdown style guide is adapted from [one provided by Google](https://google.github.io/styleguide/docguide/style.html) under a [Creative Commons 3.0 Attribution License](https://creativecommons.org/licenses/by/3.0/). It may be freely shared and further adapted according to the license terms.

</CCLicense>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "f92fbc2823cf0caf9e42a0cfb9f922de"
}
##DOCS-SOURCER-END -->
