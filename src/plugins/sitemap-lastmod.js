// `createSitemapItems` for @docusaurus/plugin-sitemap.
//
// With `lastmod` set, the plugin spawns `git log -1` per route in postBuild.
// Fork cost scales with the parent's memory (~700MB after SSG), so those
// ~1300 spawns cost ~35s. This reads the whole history in one `git log`
// (~0.25s) and pre-fills `route.metadata.lastUpdatedAt`, which the plugin
// checks before calling git. Output is unchanged.
//
// Docusaurus >= 3.10 has this built in as `future.experimental_vcs: "git-eager"`.
const path = require("path")
const { execFile } = require("child_process")
const { promisify } = require("util")

const execFileAsync = promisify(execFile)

// route.metadata.sourceFilePath is relative to the site dir.
const siteDir = path.resolve(__dirname, "..", "..")

// Map of absolute path -> newest commit timestamp (ms), same semantics as the
// plugin's `git log -1 --format=%ct -- <file>`.
async function loadLastCommitTimestamps() {
  const gitRoot = (
    await execFileAsync("git", ["rev-parse", "--show-toplevel"], { cwd: siteDir })
  ).stdout.trim()

  const { stdout } = await execFileAsync(
    "git",
    [
      "-c", "log.showSignature=false",
      "-c", "core.quotePath=false",
      "log",
      // NUL marks commit lines; a path can never start with NUL.
      "--format=%x00%ct",
      "--name-only",
    ],
    { cwd: gitRoot, maxBuffer: 512 * 1024 * 1024 },
  )

  const timestamps = new Map()
  let current
  for (const line of stdout.split("\n")) {
    if (line.charCodeAt(0) === 0) {
      current = Number(line.slice(1)) * 1000
    } else if (line !== "" && current !== undefined) {
      const absolutePath = path.resolve(gitRoot, line)
      // Newest-first, so first occurrence wins.
      if (!timestamps.has(absolutePath)) timestamps.set(absolutePath, current)
    }
  }
  return timestamps
}

function visitRoutes(routes, fn) {
  for (const route of routes) {
    fn(route)
    if (route.routes) visitRoutes(route.routes, fn)
  }
}

async function createSitemapItems({ routes, siteConfig, defaultCreateSitemapItems }) {
  let timestamps
  try {
    timestamps = await loadLastCommitTimestamps()
  } catch (err) {
    console.warn(`[sitemap-lastmod] git log failed, using per-file lookups: ${err.message}`)
    return defaultCreateSitemapItems({ routes, siteConfig })
  }

  let missed = 0
  visitRoutes(routes, (route) => {
    const metadata = route.metadata
    if (!metadata?.sourceFilePath || metadata.lastUpdatedAt) return
    const ts = timestamps.get(path.resolve(siteDir, metadata.sourceFilePath))
    if (ts) metadata.lastUpdatedAt = ts
    else missed += 1
  })
  if (missed > 0) {
    // Untracked files or a shallow clone; the plugin falls back to per-file git for these.
    console.warn(`[sitemap-lastmod] ${missed} route source file(s) not in git history`)
  }

  return defaultCreateSitemapItems({ routes, siteConfig })
}

module.exports = { createSitemapItems }
