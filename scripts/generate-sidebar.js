#!/usr/bin/env node

const yargs = require("yargs/yargs")
const path = require(`path`)
const fs = require("fs")
const startCase = require("lodash").startCase

function toOutputDocId(sourcePath) {
  // assume it could run in either source or output directories, but strip
  // out everything up to the docs site base path
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
  return fs.statSync(p).isFile && path.parse(p).name.toLowerCase() === "index"
}

const isSupportedFileType = (filepath) => {
  // we only support .md and .mdx files
  return filepath.match(/\.mdx?$/)
}

async function generateSidebar(dir, backButtonLabel = null, spacer = "") {
  // bail if it isn't actually a directory
  if (!fs.statSync(dir).isDirectory()) {
    console.log(`WARNING: skipping top-level plain file %o`, dir)
    return
  }

  if (verbose) {
    console.log("Generating: " + spacer + `%o`, path.parse(dir).name)
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
      // process subdirectories recusively (back button is top level only!)
      const items = await generateSidebar(fullPath, null, spacer + "  ")
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
  if (backButtonLabel) {
    sidebarItems.unshift({
      label: backButtonLabel,
      type: "link",
      href: toOutputDocId(path.dirname(dir)),
      className: "back-button",
    })
  }

  return sidebarItems
}

async function generateSingleSidebarFile(dir, backButtonLabel) {
  if (verbose) {
    console.log("Generating sidebar for %o", dir)
  }

  // generate it!
  const sidebar = await generateSidebar(dir, backButtonLabel)

  // exit with error if no sidebar was generated
  if (!sidebar) {
    console.log(`ERROR: Failed to generate a sidebar for %o`, dir)
    process.exit(1)
  }

  // construct the final output
  const data =
    "const sidebar = " +
    JSON.stringify(sidebar, null, 2) +
    "\n\nmodule.exports = sidebar\n"

  return data
}

async function generateMultiSidebarFile(dirs, backButtonLabel) {
  if (verbose) {
    console.log(`Generating sidebars for multiple directories: %o`, dirs)
  }

  // iterate over all dirs and generate a sidebar from each
  const sidebars = {}

  for (const dir of dirs) {
    // generate it!
    const sidebar = await generateSidebar(dir, backButtonLabel)
    // add the sidebar to our result object
    if (sidebar) {
      sidebars[path.parse(dir).name] = sidebar
    }
  }

  // exit with error if no sidebars were generated
  if (Object.keys(sidebars).length === 0) {
    console.log("ERROR: Failed to generate sidebars")
    process.exit(1)
  }

  // construct the final output
  const data =
    "const sidebars = " +
    JSON.stringify(sidebars, null, 2) +
    "\n\nmodule.exports = sidebars\n"

  return data
}

async function main() {
  const { hideBin } = require("yargs/helpers")

  // parse command line args
  const argv = yargs(hideBin(process.argv))
    .usage("$0 [-bv] [-o file] [directory]")
    .option("back", {
      alias: "b",
      type: "string",
      description: "Include a back button with the specified label",
    })
    .option("output", {
      alias: "o",
      type: "string",
      description: "The path at which to write sidebar file",
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Run with verbose logging",
    })
    .positional("directory", {
      description:
        "The directory to generate a sidebar for, e.g. a multi-page guide, or a list of directories to generate a multi-sidebar file",
    })
    .strictOptions()
    .version("1.0")
    .parse()

  // we'll let this be global, for convenience
  verbose = argv.verbose

  let data

  // generate a single or multi-sidebar file
  if (argv._.length < 2) {
    // operate on the working dir if not otherwise specified
    const inputDir = argv._[0] || process.cwd()
    data = await generateSingleSidebarFile(inputDir, argv.back)
  } else {
    data = await generateMultiSidebarFile(argv._, argv.back)
  }

  if (verbose) {
    console.log(
      "Done. Don't forget to place your sidebar file in /sidebars and update /sidebars.js to require it.\n"
    )
  }

  // write to file or print to stdout
  if (argv.output) {
    fs.writeFile(argv.output, data, (err) => {
      if (err) {
        console.log("Error writing sidebar file: ", err)
      } else {
        console.log("Wrote sidebar file to %o", argv.output)
      }
    })
  } else {
    console.log(data)
  }
}

main()
