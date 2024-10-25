# Docs Site

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern
static website generator.

## Overview

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

## Installing dependencies

```sh
yarn
```

## Local development

```sh
yarn start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server. This
command also begins watching the `_docs-sources` directory for file changes. If
you edit a file in `_docs-sources/` then the `docs-sourcer` will automatically
re-run to regenerate the output files. Docusaurus will then hot-reload that
content so that to the end user, they have "live reloading" while authoring.

### Committing changes

While authoring local content, you will exclusively be making your changes in
the `_docs-sources/` folder. The `docs-sourcer` will then pre-process and
generate output for you. To get your content _published_ you will need to commit
**both** the "source" files in `_docs-sources/` as well as the generated content
in the top level `docs/` folder.

Generated content should be up to date if you are previewing locally while
editing but you may wish to manually regenerate the output (see section below)
to ensure it is totally up to date.

### Running a production build locally

```sh
yarn build && yarn serve
```

This will create and serve a production build. This can be used to verify the
expected behaviors in a production environment and view the Google analytics.

### Manually generating docs output

It's possible to manually regenerate output content from the sources in
`_docs-sources/`:

```sh
yarn regenerate:local
```

This command can be run at any time, regardless of whether `yarn start` is
currently running.

### Generating sidebars for guides

We utilize explicit sidebar definitions for most of our docs content. Doing so enables authors to easily provide titles
for all category labels, as well as define the relative ordering of pages in a maintainable way. Long-form docs with
many sections receive a dedicated sidebar to provide a focused reading experience (e.g. /guides/build-it-yourself/\*).

A tool is provided to automatically generate sidebars for any new guide. To
run it, specify the path to the directory you wish to create a sidebar for in
either `_docs-sources/` or the output `docs/` path, relative to your current
working directory.

```sh
yarn sidebar docs/guides/build-it-yourself/my-new-guide/
```

Once generated, you're free to adjust the names of each category, which only
appear in the sidebar itself. You may also reorder any of the linked pages
within each section, which will be reflected in the rendered output.

See the usage instructions with `yarn sidebar --help` to learn how to add a
back button or specify an output file. The resulting file should be placed in
the `sidebars/` directory. You'll also need to require this file in
`sidebars.js`, and then re-run `yarn start` to see your changes.


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