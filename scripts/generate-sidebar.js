#!/usr/bin/env node

const yargs = require("yargs/yargs")
const path = require(`path`)
const fs = require("fs")
const startCase = require("lodash").startCase

function toOutputDocId(sourcePath) {
  const outputPath = sourcePath.replace(/.*_docs-sources\//, "")
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

const isCategoryIndexPredicate = (p) => {
  // e.g. .../index.md (we don't support the README variant)
  return fs.statSync(p).isFile && path.parse(p).name.toLowerCase() === "index"
}

const isSupportedFileType = (filepath) => {
  // we only support .md and .mdx files
  return filepath.match(/\.mdx?$/)
}

async function generateSidebar(dir, spacer = "") {
  if (argv.verbose) {
    console.log("Processing directory: " + spacer + `%o`, path.parse(dir).name)
  }

  const paths = fs.readdirSync(dir)
  let fullPaths = paths.map((p) => {
    return path.join(dir, p)
  })
  const resultingItems = []

  const categoryIndex = fullPaths.find(isCategoryIndexPredicate)
  fullPaths = fullPaths.filter((p) => !isCategoryIndexPredicate(p))

  // iterate over all non-index files in this directory
  for (const fullPath of fullPaths) {
    if (fs.statSync(fullPath).isDirectory()) {
      // process subdirectories recusively
      const items = await generateSidebar(fullPath, spacer + "  ")
      resultingItems.push({ [formatName(fullPath)]: items })
    } else {
      // if it's a (supported) file, just output its path
      if (isSupportedFileType(fullPath)) {
        const generatedPageId = toOutputDocId(fullPath)
        resultingItems.push(generatedPageId)
      }
    }
  }

  if (categoryIndex) {
    return [
      {
        label: formatName(dir),
        type: "category",
        link: {
          type: "doc",
          id: toOutputDocId(categoryIndex),
        },
        items: resultingItems,
      },
    ]
  }

  return resultingItems
}

async function main() {
  const { hideBin } = require("yargs/helpers")

  argv = yargs(hideBin(process.argv))
    .usage("$0 [-bv] [-o file] [directory]")
    .option("back", {
      alias: "b",
      type: "boolean",
      description: "Include a back button at the top of the sidebar",
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
        "the directory to generate a sidebar for, e.g. a multi-page guide",
    })
    .strictOptions()
    .parse()

  if (argv.verbose) {
    console.log("Generating sidebar for %o", argv._[0] || process.cwd())
  }

  // operate on the working dir if not otherwise specified
  const inputDir = argv._[0] || process.cwd()
  const sideBar = await generateSidebar(inputDir)

  // add a back button, if requested
  if (argv.back) {
    sideBar.unshift({
      label: "INSERT_BACK_LABEL_HERE",
      type: "link",
      href: toOutputDocId(path.dirname(inputDir)),
      className: "back-button",
    })
  }

  if (argv.verbose) {
    console.log(
      "Done. Don't forget to place your sidebar file in /sidebars and update /sidebars.js to require it.\n"
    )
  }

  // construct the final output
  data =
    "const sidebar = " +
    JSON.stringify(sideBar, null, 2) +
    "\n\nmodule.exports = sidebar\n"

  // write to file or print to stdout
  if (argv.output) {
    fs.writeFile(argv.output, data, (err) => {
      if (err) {
        console.log("Error writing sidebar file: ", err)
      }
    })
  } else {
    console.log(data)
  }
}

main()
