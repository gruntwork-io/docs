# Generating Gruntwork Package and Module Documentation

This repo contains a set of tools for generating Gruntwork Package and Gruntwork Module documentation on a public website
in a customizable format.

## Features

This docs site is built using [Gatsby](https://www.gatsbyjs.org/), a static site generator that is based on React.
We have extended it using plugins and custom code to support all of the relevant features required, including:

- Syntax highlighting (via prismjs)
- Copy code to clipboard
- Image Captions
- Responsive design with fixed header
- Edit on GitHub buttons
- Google Analytics
- A dynamic sidebar with the ToC of the current page

### The Generation Workflow

Generating documentation is a multi-step process made up of the following stages:

1. `docs-fetcher`: Fetch all Gruntwork Package and Gruntwork Module source code into one repo.
2. `docs-preprocessor`: Transform the default folder structure of Gruntwork docs into a folder structure that mirrors
   the desired public website structure.
3. `docs-generator`: Convert markdown files to HTML files, and generate an HTML-based navigation for all pages.

By using separate tools, we can compose this process to generate different kinds of documentation, pull from different
sources, or output in a different format.
