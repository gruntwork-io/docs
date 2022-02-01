#!/usr/bin/env node

const yargs = require("yargs/yargs")
const path = require("path")
const fs = require("fs")
const {
  generateSingleSidebarFile,
  generateMultiSidebarFile,
} = require("./sidebar-lib")

// when running with yarn, we need to prepend the initial
// working directory to the path
const resolveDir = (dir) => {
  if (process.env.INIT_CWD) {
    return path.resolve(path.join(process.env.INIT_CWD, dir))
  } else {
    return path.resolve(dir)
  }
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

  const opts = {
    backButton: argv.back,
    verbose: argv.verbose,
  }

  let data

  // generate a single or multi-sidebar file
  try {
    if (argv._.length < 2) {
      // operate on the working dir if not otherwise specified
      const inputDir = resolveDir(argv._[0] || ".")
      data = await generateSingleSidebarFile(inputDir, opts)
    } else {
      const inputDirs = argv._.map(resolveDir)
      data = await generateMultiSidebarFile(inputDirs, opts)
    }
  } catch (err) {
    console.log(`ERROR: Failed to generate a sidebar — %o`, err.message)
    process.exit(1)
  }

  if (opts.verbose) {
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
