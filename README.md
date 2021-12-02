# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern
static website generator.

### Docs Sourcer

All of the content that we see on the docs site is rendered to the top level
`docs/` folder by the
[docs-sourcer](https://github.com/gruntwork-io/docs-sourcer). `docs-sourcer` is
a process which can pull content from our GitHub repos as well as pre-process
the MarkDown files which comprise the docs site's manually authored content (in
`_docs-sources/`). At present, `docs-sourcer` isn't augmenting the content all
that much, but in the future, the idea is that `docs-sourcer` will be able to
pull in tagged content from other files, located in other GitHub repos, pull in
images and auto-correct links. This will allow content creators to have more
features when authoring content.

### Content creation

All manually created MarkDown source content lives in the `_docs-sources/`
folder. The top level `docs/` folder contains the _generated_ output that
results after the `docs-sourcer` processes the `_docs-sources/` directory.
Grunts should **never edit any of the MarkDown files in the `docs/` folder
directly**. We should always be editing the content in `_docs-sources/`.

### Installation of dependencies

```
$ yarn
```

### Local development

```
$ yarn start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server. This
command also begins watching the `_docs-sources` directory for file changes. If
you edit a file in `_docs-sources/` then the `docs-sourcer` will automatically
re-run to regenerate the output files. Docusaurus will then hot-reload that
content so that to the end user, they have "live reloading" while authoring.

### Committing changes to docs

While authoring local content, you will exclusively be making your changes in
the `_docs-sources/` folder. The `docs-sourcer` will then pre-process and
generate output for you. To get your content _published_ you will need to commit
**both** the "source" files in `_docs-sources/` as well as the generated content
in the top level `docs/` folder.

Generated content should be up to date if you are previewing locally while
editing but you may wish to manually regenerate the output (see section below)
to ensure it is totally up to date.

### Manually generating docs output

It's possible to manually regenerate output content from the sources in
`_docs-sources/`:

```
yarn regenerate:local
```

This command can be run at any time, regardless of whether `yarn start` is
currently running.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.
