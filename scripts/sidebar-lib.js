#!/usr/bin/env node

const yargs = require("yargs/yargs")
const path = require("path")
const fs = require("fs")
const startCase = require("lodash").startCase

function toOutputDocId(sourcePath) {
  // assume it could run against either source or output directories,
  // but strip out everything up to the docs site base path
  const outputPath = path
    .resolve(sourcePath)
    .replace(/.*\/(_docs-sources|docs)\//, "")
  // then drop the extension
  const docId = path.join(
    path.parse(outputPath).dir,
    path.parse(outputPath).name
  )
  return docId
}

const formatName = (filepath) => {
  // TODO: extract from _category_.json file or file itself?
  return startCase(path.parse(filepath).name.replace(/\-/gim, " "))
}

const isCategoryIndexFilePredicate = (p) => {
  // e.g. .../index.md (we don't support the README variant)
  return (
    fs.statSync(p).isFile() &&
    isSupportedFileType(p) &&
    path.parse(p).name.toLowerCase() === "index"
  )
}

const isSupportedFileType = (filepath) => {
  // we only support .md and .mdx files
  return filepath.match(/\.mdx?$/)
}

async function generateSidebar(dir, opts = {}) {
  // bail if it isn't actually a directory
  if (!fs.statSync(dir).isDirectory()) {
    console.log(`WARNING: skipping top-level plain file %o`, dir)
    return
  }

  opts.spacer = opts.spacer || ""

  if (opts.verbose) {
    console.log("Generating: " + opts.spacer + `%o`, path.parse(dir).name)
  }

  // fetch the directory contents
  const paths = fs.readdirSync(dir)
  let fullPaths = paths.map((p) => {
    return path.join(dir, p)
  })

  // bail if the directory is empty
  if (fullPaths.length == 0) {
    console.log(`WARNING: skipping empty directory %o`, dir)
    return
  }

  // determine if this directory follows the category index convention
  const categoryIndex = fullPaths.find(isCategoryIndexFilePredicate)
  // if so, iterate only the non-index pages
  fullPaths = fullPaths.filter((p) => !isCategoryIndexFilePredicate(p))

  // iterate over all non-index files in this directory
  let sidebarItems = []

  for (const fullPath of fullPaths) {
    if (fs.statSync(fullPath).isDirectory()) {
      // process subdirectories recusively
      const items = await generateSidebar(fullPath, {
        // note: back button is ommited as it's top-level only
        verbose: opts.verbose,
        spacer: opts.spacer + "  ",
      })
      if (items) {
        sidebarItems.push({ [formatName(fullPath)]: items })
      }
    } else {
      // if it's a file (of supported type), just output its path
      if (isSupportedFileType(fullPath)) {
        const generatedPageId = toOutputDocId(fullPath)
        sidebarItems.push(generatedPageId)
      }
    }
  }

  // create a category index block with the other items if there is one
  if (categoryIndex) {
    sidebarItems = [
      {
        label: formatName(dir),
        type: "category",
        link: {
          type: "doc",
          id: toOutputDocId(categoryIndex),
        },
        items: sidebarItems,
      },
    ]
  }

  // add a back button, if requested
  if (opts.backButton) {
    sidebarItems.unshift({
      label: opts.backButton,
      type: "link",
      href: "/" + toOutputDocId(path.dirname(dir)), // must be absolute
      className: "back-button",
    })
  }

  return sidebarItems
}

async function generateMultiSidebar(dirs, opts = {}) {
  const sidebars = {}

  for (const dir of dirs) {
    // generate it!
    const sidebar = await generateSidebar(dir, opts)
    // add the sidebar to our result object
    if (sidebar) {
      sidebars[path.parse(dir).name] = sidebar
    }
  }

  return sidebars
}

async function generateSidebarFile(dir, opts = {}) {
  if (opts.verbose) {
    console.log("Generating sidebar for %o", dir)
  }

  // generate it!
  const sidebar = await generateSidebar(dir, opts)

  // exit with error if no sidebar was generated
  if (!sidebar) {
    console.log(`ERROR: Failed to generate a sidebar for %o`, dir)
    return undefined
  }

  // construct the final output
  const data =
    "const sidebar = " +
    JSON.stringify(sidebar, null, 2) +
    "\n\nmodule.exports = sidebar\n"

  return data
}

async function generateMultiSidebarFile(dirs, opts = {}) {
  if (opts.verbose) {
    console.log(`Generating sidebars for multiple directories: %o`, dirs)
  }

  // iterate over all dirs and generate a sidebar from each
  const sidebars = await generateMultiSidebar(dirs, opts)

  // exit with error if no sidebars were generated
  if (Object.keys(sidebars).length === 0) {
    console.log("ERROR: Failed to generate sidebars")
    return undefined
  }

  // construct the final output
  const data =
    "const sidebars = " +
    JSON.stringify(sidebars, null, 2) +
    "\n\nmodule.exports = sidebars\n"

  return data
}

module.exports = {
  // for execution
  generateSidebarFile: generateSidebarFile,
  generateMultiSidebarFile: generateMultiSidebarFile,

  // for testing
  generateSidebar: generateSidebar,
  generateMultiSidebar: generateMultiSidebar,

  // helpers, also for testing
  toOutputDocId: toOutputDocId,
  formatName: formatName,
  isCategoryIndexFilePredicate: isCategoryIndexFilePredicate,
  isSupportedFileType: isSupportedFileType,
}
