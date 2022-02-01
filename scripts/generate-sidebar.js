#!/usr/bin/env node

const yargs = require("yargs/yargs")
const path = require(`path`)
const fs = require("fs")
const startCase = require("lodash").startCase

function toOutputPath(sourcePath) {
  return sourcePath.replace(/.*_docs-sources/, "")
}

async function generateSidebar(dir) {
  const paths = fs.readdirSync(dir)
  const resultingItems = []

  // // console.log(paths)
  // const foundIndex = paths.find((p) => {
  //   let fullPath = path.join(dir, p)
  //   // console.log(fullPath)
  //   if (fs.statSync(fullPath).isDirectory()) {
  //     // console.log("DIR: ", fullPath)
  //     return false
  //   }
  //   // console.log(path.parse(p).name.toLowerCase())
  //   return path.parse(p).name.toLowerCase() === "index"
  // })
  // if (foundIndex) {
  //   console.log("AHA! AN INDEX FILE in: %o", paths)
  // }
  // process.exit(1)

  // iterate over all files in this directory
  for (const file of paths) {
    let fullDir = path.join(dir, file)
    const newFullDir = path.join(dir, file.substring(2))

    // process subdirectories recusively
    if (fs.statSync(fullDir).isDirectory()) {
      if (argv.verbose) {
        console.log(`Processing subdirectory: %o`, path.parse(fullDir).name)
      }

      const items = await generateSidebar(fullDir)
      const foundIndex = items.find((item) => {
        if (typeof item === "object") {
          return false
        }
        // console.log(path.parse(item).name.toLowerCase())
        return path.parse(item).name.toLowerCase() === "index"
      })
      const betterName = startCase(
        path.parse(fullDir).name.replace(/\-/gim, " ")
      )

      // apply the category-index convention to make the category clickable,
      // and remove it from the list of subpages
      if (foundIndex) {
        // console.log(`Found index in %o`, fullDir)
        resultingItems.push({
          label: betterName,
          type: "category",
          link: {
            type: "doc",
            id: foundIndex,
          },
          items: items.filter((item) => {
            if (typeof item === "object") {
              return true
            }
            return path.parse(item).name.toLowerCase() !== "index"
          }),
        })
      } else {
        resultingItems.push({ [betterName]: items })
      }
      // if it's a file, output its path
    } else {
      if (file.match(/.md$/)) {
        const properPath = toOutputPath(fullDir)
        const generatedPageId = path.join(
          path.parse(properPath).dir,
          path.parse(properPath).name
        )
        resultingItems.push(generatedPageId)
      }
    }
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

  // add a back button, if called for
  if (argv.back) {
    sideBar.unshift({
      label: "Back to INSERT_TITLE_HERE",
      type: "link",
      href: toOutputPath(path.dirname(inputDir)),
      className: "back-button",
    })
  }

  if (argv.verbose) {
    console.log("Done.\n")
  }

  // console.log(
  //   "Done. Don't forget to place your sidebar file in /sidebars and update /sidebars.js to require it.\n"
  // )

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
