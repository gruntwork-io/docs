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
