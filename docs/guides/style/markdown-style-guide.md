---
toc_max_heading_level: 2
---

import Admonition from "@theme/Admonition"
import { CCLicense } from "/src/components/CCLicense"

# Markdown style guide

<!--

NOTE TO EDITORS: some of the code-fenced examples in this document omit
the `markdown` language declaration. This is done purposefully to avoid
auto-formatting by IDEs of examples by specifically intended to demonstrate
incorrect Markdown syntax.

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
    level one heading is used as the page `<title>`.

1.  `Short introduction.` 1-3 sentences providing a high-level overview of the
    topic. Imagine yourself as a complete newbie, who landed on your "Extending
    Foo" doc and needs to know the most basic assumptions you take for granted.
    "What is Foo? Why would I extend it?"

1.  `## Topic`: The rest of your headings should start from level 2.

### Table of contents

Markdown doesn't include native syntax for a table of contents. While a TOC
can help users find relevant content on longer pages more easily, they are
difficult to maintain manually, and easily get out of sync with the content.

Because both GitHub (where our code and READMEs are hosted) and Docusaurus
(where our documentation is hosted) provide an auto-generated table of contents
based on the headers in the document, you should generally _omit_ a TOC from
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
we encourage keeping them short). Otherwise, wrap your text to 80 characters:

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

All files should end with a single empty line to avoid any potential
incompatibilities with some Markdown editors and/or rendering engines. For more
info, see [this thread](https://unix.stackexchange.com/questions/18743/whats-the-point-in-adding-a-new-line-to-the-end-of-a-file).

## Paragraphs

To create paragraphs, use a single blank line to separate one or more lines of
text.

```markdown
This is a paragraph. Make it as long as you want,
and wrap text as needed.

This is the beginning of a second paragraph.
```

Don't indent the first line of a paragraph unless it part of a [list](#lists).
This can cause unexpected formatting issues, and makes it harder to read.

```
    The first line of this paragraph is indented, which may
cause it to be interpreted incorrectly. DO NOT DO THIS.
```

### Trailing whitespace

Don't use trailing whitespace, use a trailing backslash.

The [CommonMark spec](http://spec.commonmark.org/0.20/#hard-line-breaks) decrees
that two spaces at the end of a line should insert a `<br />` tag. However, many
directories have a trailing whitespace presubmit check in place, and many IDEs
will clean it up anyway.

Best practice is to avoid the need for a `<br />` altogether. Markdown creates
paragraph tags for you simply with newlines: get used to that.

## Headings

### ATX-style headings

```markdown
## Heading 2
```

Headings with `=` or `-` underlines can be annoying to maintain and don't fit
with the rest of the heading syntax. The user has to ask: Does `---` mean H1 or
H2?

```
Heading - do you remember what level? DO NOT DO THIS.
---
```

### Add spacing to headings

Prefer spacing after `#` and newlines before and after:

```markdown
...text before.

# Heading 1

Text after...
```

Lack of spacing makes it a little harder to read in source:

```markdown
...text before.

#Heading 1
Text after... DO NOT DO THIS.
```

## Emphasis

### Double asterisks for bold text

For clarity, always bold text by surrounding it with double asterisks. This also ensures that it works properly when attempting to bold a portion of a longer word.

```markdown
**bold text**
```

Avoid using double underscores for bold text, as it's harder to distinguish from italics at a glance.

```markdown
**This is also bold. DO NOT DO THIS.**
```

### Single underscores for italics

For clarity, always italicize text by surrounding it with single underscores.

```markdown
_italicized text_
```

Avoid using single asterisks for italicized text, as it's harder to distinguish from bold text at a glance.

```markdown
_This is also italicized. DO NOT DO THIS._
```

## Lists

### Dashes for bulleted lists

Prefer dashes (-) for all bulleted lists over asterisks (\*) or plus signs (+).

```markdown
- Foo.
- Bar.
- Baz.
```

They're a touch easier to type and make it easier to recognize what's going
on if the list item opens with bold text. Compare this:

```markdown
- **Foo.** foo foo
- **Bar.** bar bar
- **Baz.** baz baz
```

To this:

```
* **Foo.** foo foo
* **Bar.** bar bar
* **Baz.** baz baz DO NOT DO THIS
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

### Nested list spacing

When nesting lists, use a 4 space indent for both numbered and bulleted lists:

```
1.  2 spaces after a numbered list.
    4 space indent for wrapped text.
2.  2 spaces again.

-   3 spaces after a bullet.
    4 space indent for wrapped text.
    1.  2 spaces after a numbered list.
        8 space indent for the wrapped text of a nested list.
    2.  Looks nice, don't it?
-   3 spaces after a bullet.
```

The following works, but it's very messy:

```markdown
- One space,
  with no indent for wrapped text. 1. Irregular nesting... DO NOT DO THIS.
```

Even when there's no nesting, using the 4 space indent makes layout consistent
for wrapped text:

```markdown
- Foo,
  wrapped.

1.  2 spaces
    and 4 space indenting.
2.  2 spaces again.
```

However, when lists are small, not nested, and a single line, one space can
suffice for both kinds of lists:

```markdown
- Foo
- Bar
- Baz.

1. Foo.
2. Bar.
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

<pre>
```python
def Foo(self, bar):
  self.bar = bar
```
</pre>

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

<pre>
```shell
bazel run :target -- --flag --foo=longlonglonglonglongvalue \
--bar=anotherlonglonglonglonglonglonglonglonglonglongvalue
```
</pre>

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

```markdown
> Our mission at Gruntwork is to make it 10x easier to understand, build, and
> deploy software.
```

Don't omit the `>` even in contexts where the Markdown syntax supports it, such
as a single paragraph. It's far less obvious in the source at a glance, and
it retains consistency with multi-paragraph blockquotes and any that contain
formatted content like lists, which require the carat on each line anyway.

```
> Our mission at Gruntwork is to make it 10x easier to understand, build, and
deploy software. DO NOT DO THIS.
```

Dorothy followed her through many of the beautiful rooms in her castle.

## Admonitions

Use admonitions to call attention to particular details within the body of a doc, such as a cautionary warning, or a bit of supplemental information that isn’t essential to its primary reading. These come in several flavors depending on the type or severity of the information being communicated: `note`, `tip`, `info`, `caution`, and `danger`.

Markdown doesn’t provide native support for this feature. However, Docusaurus enables a custom syntax as shown below:

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

```markdown
> **Note**
> This text appears like a callout on the page.
```

:::note

When a simulated admonition of this kind is imported into our documentation,
it will be automatically translated into the Docusaurus admonition syntax and
appear rendered in the same style.

:::

## Expandable details

Although you should generally [avoid HTML](#strongly-prefer-markdown-to-html),
the `<details>` element enables one to expand and collapse sections of content
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

Long links make source Markdown difficult to read and break the 80 character
wrapping. **Wherever possible, shorten your links**.

### Use informative link titles

Markdown link syntax allows you to set a link title, just as HTML does. Use it
wisely.

Titling your links as "link" or "here" tells the reader precisely nothing when
quickly scanning your doc and is a waste of space:

```markdown
See the syntax guide for more info: [link](syntax_guide.md).
Or, check out the style guide [here](style_guide.md).
DO NOT DO THIS.
```

Instead, write the sentence naturally, then go back and wrap the most
appropriate phrase with the link:

```markdown
See the [syntax guide](syntax_guide.md) for more info.
Or, check out the [style guide](style_guide.md).
```

### Avoid bare links

Avoid bare links without any syntax, as these won't be rendered reliably in
all contexts:

```markdown
This is a bare link to https://docs.gruntwork.io. DO NOT DO THIS.
```

If you wish to present a link as its own link text, you must duplicate the URL
within the text of the link syntax:

```markdown
This is a proper link to [https://docs.gruntwork.io](https://docs.gruntwork.io)
```

If you're using the text of a link purely informatively and _do not want it to
function as a link_, use backticks to treat it as inline code:

```markdown
This link to `https://docs.gruntwork.io` is for informational purposes only.
```

## Images

Use images sparingly, and prefer simple screenshots. This guide is designed
around the idea that plain text gets users down to the business of communication
faster with less reader distraction and author procrastination. However, it's
sometimes very helpful to show what you mean.

### Provide Alt Text

Always specify alt text for your images to improve accessibility by providing
text in the brackets preceding the link:

```markdown
![Describe the image briefly](/img/path/to/image.png)
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

```markdown
Always put a blank line before…

---

…and after a horizontal rule.
```

## Prefer lists to tables

Any tables in your Markdown should be small. Complex, large tables are difficult
to read in source and most importantly, **a pain to modify later**.

```markdown
| Fruit  | Attribute                                                                                                             | Notes                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Apple  | [Juicy](https://example.com/SomeReallyReallyReallyReallyReallyReallyReallyReallyLongQuery), Firm, Sweet               | Apples keep doctors away.                             |
| Banana | [Convenient](https://example.com/SomeDifferentReallyReallyReallyReallyReallyReallyReallyReallyLongQuery), Soft, Sweet | Contrary to popular belief, most apes prefer mangoes. |

DO NOT DO THIS
```

[Lists](#lists) and subheadings usually suffice to present the same information
in a slightly less compact, though much more edit-friendly way:

```markdown
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

However, there are times when a small table is called for:

```markdown
| Transport        | Favored by     | Advantages                    |
| ---------------- | -------------- | ----------------------------- |
| Swallow          | Coconuts       | Otherwise unladen             |
| Bicycle          | Miss Gulch     | Weatherproof                  |
| X-34 landspeeder | Whiny farmboys | Cheap since the X-38 came out |
```

## Strongly prefer Markdown to HTML

Please prefer standard Markdown syntax wherever possible and avoid HTML hacks.
If you can't seem to accomplish what you want, reconsider whether you really
need it. Except for [big tables](#prefer-lists-to-tables), Markdown meets almost
all needs already.

Every bit of HTML or Javascript hacking reduces the readability and portability.
This in turn limits the usefulness of integrations with
other tools, which may either present the source as plain text or render it.

<CCLicense license="by">

This Markdown style guide is adapted from [one provided by Google](https://google.github.io/styleguide/docguide/style.html) under a [Creative Commons 3.0 Attribution License](https://creativecommons.org/licenses/by/3.0/). It may be freely shared and further adapted according to the license terms.

</CCLicense>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"e0059b818ad6e9b3ffb72fc31abd1818"}
##DOCS-SOURCER-END -->
