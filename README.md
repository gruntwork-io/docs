# Docs Site

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern
static website generator.

## Overview

### Docs Sourcer

The vast majority of content in the `docs` folder is maintained by developers and not automation.
There are, however, some types of docs that are maintained by a tool called `docs-sourcer`. You can
identify those files by the `##DOCS-SOURCER-START` tag at the end of the file. In general
this is content that is pulled from external sources, such as change logs, release notes and
GitHub discussions.

Docs Sourcer is generally run in CI or via webhooks and doesn't have to be run locally. If, however, you do need
to run it locally you will need access to various secrets.  These secrets live in 1password under a secure note called
"docs sourcer .env file".

> **TODO — docs-sourcer / MDX 3 compatibility (Docusaurus 3 migration):**
> The `##DOCS-SOURCER-*` metadata blocks are wrapped in `{/* ... */}` so MDX 3
> accepts them, with the literal `<!-- ... -->` HTML markers preserved inside
> for the docs-sourcer validator's `indexOf` check. This is a temporary bridge.
>
> **Do not run `yarn run-docs-sourcer` (or `yarn regenerate`) until docs-sourcer
> is updated** — its `writeMetadata` strips from `<!--` and re-appends a plain
> HTML-comment block, leaving an orphaned `{/*` and `*/}` that breaks the MDX
> build.
>
> Durable fix: change `METADATA_START_TOKEN` / `METADATA_END_TOKEN` in
> `docs-sourcer`'s `src/services/content-service.ts` to `{/* ##DOCS-SOURCER-START`
> and `##DOCS-SOURCER-END */}`, release a new version, then this repo's existing
> file format works directly. After that, the `<!-- -->` wrappers can be removed
> from these files.

### Sitemap `lastmod` requires a deep git clone on Vercel

`docusaurus.config.js` enables `future.faster.gitEagerVcs: true` and
`sitemap.lastmod: "date"`, so each `<url>` in `build/sitemap.xml` carries a
`<lastmod>` derived from `git log` at build time.

Vercel clones with `--depth 1` by default, which leaves git unable to
determine when most files were last modified — every date would collapse to
the deploy commit. `scripts/vercelbuild.sh` therefore prepends
`git fetch --unshallow --filter=blob:none || true` before `yarn install`. The
`|| true` keeps already-deep clones from failing the build.

If you later enable `showLastUpdateTime` / `showLastUpdateAuthor` in the docs
plugin, no further action is needed — they read from the same git source.

### TypeScript `baseUrl` is deprecated and will hard-error in TS 7

`tsconfig.json` sets `ignoreDeprecations: "6.0"` to silence one warning:
`baseUrl` is deprecated in TS 5+ and removed in TS 7. We can't drop it
locally because:

- `@docusaurus/tsconfig` (the base we extend) also sets `baseUrl: "."`, which
  TypeScript resolves relative to the *extended* file's location
  (`node_modules/@docusaurus/tsconfig/`), not ours.
- Removing only the local `baseUrl` makes the inherited one apply, which
  resolves `@site/*` paths into the vendored Docusaurus directory and breaks
  any swizzle that imports from `@site/...` (verified — two of our CodeBlock
  swizzles fail to resolve).

Two viable fixes when TS 7 lands:

1. **Upstream fix:** drop `baseUrl` from `@docusaurus/tsconfig` and rely on
   TS 5+ behavior where `paths` resolve relative to the tsconfig file. Then
   drop our local `baseUrl` too.
2. **Stop extending `@docusaurus/tsconfig`:** inline its options minus
   `baseUrl`. Trades dependency on an upstream fix for a small amount of
   config duplication.

The pre-existing `npx tsc` errors (35 as of this writing) are unrelated and
not enforced in CI; only `yarn build` and `yarn test` gate merges.

### `onBrokenAnchors` is set to Docusaurus's default of `'warn'`

The Docusaurus 3 migration tightened the broken-link checker to `'throw'`
(default), which catches dead `<Link to>` targets and blocks builds. **Broken
anchors** (e.g. `[text](/page/#missing-section)`) are still only warned about
because ~22 pre-existing anchor breakages in `docs/reference/...` would
otherwise block every build until they're fixed.

Risk: a future PR can introduce a typo'd anchor and CI won't catch it.

To escalate, in two steps:

1. Fix the 22 existing broken anchors (`yarn build` lists them under
   `[WARNING] Docusaurus static site generation process emitted warnings for
   N paths`).
2. Add `onBrokenAnchors: 'throw'` to `docusaurus.config.js`.

The same applies — at lower priority — to the HTML-minifier nesting
diagnostics that surface as warnings during build (`End tag "p" implied`,
nested `<a>` tags, etc.). Those are content bugs in pre-existing pages, not
a checker config problem.

## Installing dependencies

```sh
yarn
```

## Local development

```sh
yarn start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Running a production build locally

```sh
yarn build && yarn serve
```

This will create and serve a production build. This can be used to verify the
expected behaviors in a production environment and view the Google analytics.

# Linking to other pages

We only allow absolute links to other internal docs pages, e.g. `(modules)[/2.0/docs/library/concepts/modules]`.  This is to ensure that links work when the site is deployed to s3 which always appends a trailing slash.

# Customizable Values

It's often useful to present the user with the ability to edit a variable inline to documentation.  For example, you're about to present a block of code that references an S3 bucket name.  Rather than put in a fixed placeholder like <BUCKET_NAME> which the user has to manually edit, you can use our CustomizableValue component.  This component will render as a clickable text field which, when clicked, switches to an input. Any inputted characters will be auto-propegated to all other instances of the component that share the same ID.  You can use this component both as a React component and inline to MDX code blocks.  We have swizzled the CodeBlock components to make this possible.

Example usage:

As a component:
```js
<CustomizableValue id="BUCKET_NAME">
```

Using the \$\$ID\$\$ syntax inside a code block
```md
This is inside a code block, $$BUCKET_NAME$$
```
# Spell Check
The codebase (in `docs/2.0/`) is spell checked via CI using `cspell`.  We have a custom dictionary in `./custom-dictionary.txt`.  You can test spelling locally with `yarn spellcheck` (your IDE likely also automatically does this).  Feel free to add new terms to the dictionary that are bespoke to Gruntwork.  You can [disable spell check](https://cspell.org/configuration/document-settings/) for a block using the following pattern:
```
<!-- spell-checker: disable -->
MY POURLEY SPELLED WURDS
<!-- spell-checker: enable -->
Content that is once again spell checked.
```

# Automated Pull Request Flows
There are two main categories of the Automated PRs that get opened in the Docs repostory:
* PRs for Pull requests in module repositories - have "Automated Preview" title
* PRs for Releases in module repositories - have "Automated Update" title

## Automated Preview PRs
The "Automated Preview" PRs are meant for the developers of different modules to be responsible for their docs while developing so they can ensure correctness. However, they are not intended to be merged since Docs are tied to versions of the modules

When the Pull request in a module repository is closed or merged, the associated "Automated Preview" docs PR is automatically closed.

## Automated Updated PRs
When a module repository gets a new release, the "Automated Update" pull request is opened on the docs site and that is what is intended to be merged and eventually released to the Docs site.

## Automation Setup
The automation of the PRs is accomplished via docs-sourcer ([docs](https://github.com/gruntwork-io-team/dogfood-infrastructure-live/blob/main/OPERATOR.md#docs-sourcer) - [repo](https://github.com/gruntwork-io/docs-sourcer)), ultimately its a lambda function receiving GitHub webhooks.