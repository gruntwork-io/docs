#!/usr/bin/env node
/**
 * Script to find orphaned documentation pages.
 * A page is "orphaned" if:
 * 1. No other documentation page links to it
 * 2. It is not referenced in any sidebar
 * 
 * Usage: node scripts/find-orphaned-pages.js
 */

const fs = require("fs")
const path = require("path")
const glob = require("glob")

const DOCS_DIR = path.join(__dirname, "..", "docs")
const SIDEBARS_DIR = path.join(__dirname, "..", "sidebars")

// Patterns to exclude from orphan detection (generated/special pages)
const EXCLUDE_PATTERNS = [
  /discussions\/knowledge-base/,  // Auto-generated discussions
  /guides\/stay-up-to-date\/releases/,  // Release notes (auto-linked)
  /guides\/stay-up-to-date\/cis/,  // CIS updates
  /guides\/stay-up-to-date\/terraform/,  // Terraform updates
  /guides\/build-it-yourself\/achieve-compliance/,  // Compliance guides
  /reference\/modules\/.*\/.*\.md/,  // Module reference pages (linked from index)
  /reference\/services\//,  // Service reference pages
  /\.json$/,  // JSON files (category metadata)
]

// Convert file path to Docusaurus doc ID
function pathToDocId(filePath) {
  let relativePath = path.relative(DOCS_DIR, filePath)
  // Remove file extension
  relativePath = relativePath.replace(/\.(md|mdx)$/, "")
  // Remove index from path
  relativePath = relativePath.replace(/\/index$/, "")
  return relativePath
}

// Find all documentation files
function findAllDocFiles() {
  const mdFiles = glob.sync("**/*.md", { cwd: DOCS_DIR, absolute: true })
  const mdxFiles = glob.sync("**/*.mdx", { cwd: DOCS_DIR, absolute: true })
  return [...mdFiles, ...mdxFiles].filter((f) => {
    // Exclude JSON files
    if (f.endsWith(".json")) return false
    return true
  })
}

// Extract all internal links from a markdown file
function extractLinks(filePath) {
  const content = fs.readFileSync(filePath, "utf-8")
  const links = new Set()

  // Match markdown links: [text](path)
  const mdLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g
  let match
  while ((match = mdLinkRegex.exec(content)) !== null) {
    const link = match[2]
    // Filter out external links and anchors
    if (
      !link.startsWith("http") &&
      !link.startsWith("#") &&
      !link.startsWith("mailto:")
    ) {
      // Normalize the link
      let normalizedLink = link.split("#")[0] // Remove anchor
      normalizedLink = normalizedLink.split("?")[0] // Remove query string
      if (normalizedLink) {
        links.add(normalizedLink)
      }
    }
  }

  // Match MDX/JSX imports if they reference other docs
  const importRegex = /import\s+.*from\s+['"]([^'"]+)['"]/g
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    if (importPath.startsWith(".") || importPath.startsWith("/")) {
      links.add(importPath)
    }
  }

  // Match docusaurus-style doc links in frontmatter or content
  // e.g., id references like "2.0/docs/pipelines/overview"
  const docIdRegex = /(?:href|to|id):\s*['"]?([^'"}\s]+)['"]?/g
  while ((match = docIdRegex.exec(content)) !== null) {
    const ref = match[1]
    if (
      !ref.startsWith("http") &&
      !ref.startsWith("#") &&
      !ref.startsWith("{")
    ) {
      links.add(ref)
    }
  }

  return links
}

// Extract doc IDs from sidebar files
function extractSidebarDocIds() {
  const docIds = new Set()

  // Read all sidebar JS files and extract doc IDs using regex
  // (Parsing JS is complex, so we use regex for common patterns)
  const sidebarFiles = glob.sync("*.js", { cwd: SIDEBARS_DIR, absolute: true })

  for (const sidebarFile of sidebarFiles) {
    const content = fs.readFileSync(sidebarFile, "utf-8")

    // Match doc id references in sidebars
    // Pattern: id: "some/path" or "id": "some/path"
    const idRegex = /["']?id["']?\s*:\s*["']([^"']+)["']/g
    let match
    while ((match = idRegex.exec(content)) !== null) {
      docIds.add(match[1])
    }

    // Match type: "doc" items
    const docTypeRegex =
      /type:\s*["']doc["'][^}]*id:\s*["']([^"']+)["']|id:\s*["']([^"']+)["'][^}]*type:\s*["']doc["']/g
    while ((match = docTypeRegex.exec(content)) !== null) {
      if (match[1]) docIds.add(match[1])
      if (match[2]) docIds.add(match[2])
    }

    // Match link.id patterns
    const linkIdRegex = /link:\s*\{[^}]*id:\s*["']([^"']+)["']/g
    while ((match = linkIdRegex.exec(content)) !== null) {
      docIds.add(match[1])
    }

    // Match bare string doc IDs in arrays (e.g., items: ["path/to/doc", ...])
    // These appear as quoted strings inside arrays, typically after items: [
    const bareStringRegex = /items:\s*\[([^\]]+)\]/gs
    while ((match = bareStringRegex.exec(content)) !== null) {
      const arrayContent = match[1]
      // Extract all quoted strings that look like doc paths
      const stringRegex = /["']([a-zA-Z0-9_\-/]+)["']/g
      let stringMatch
      while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
        const potentialId = stringMatch[1]
        // Filter out common non-doc strings
        if (
          potentialId.includes("/") &&
          !potentialId.startsWith("http") &&
          !["doc", "category", "link", "html"].includes(potentialId)
        ) {
          docIds.add(potentialId)
        }
      }
    }

    // Match standalone quoted strings that look like doc IDs (common in sidebar arrays)
    // Pattern: "docs/path/to/file" or 'docs/path/to/file' not preceded by common keywords
    const standaloneDocRegex = /(?<!type:\s*|label:\s*|href:\s*|className:\s*)["']((?:2\.0\/|docs\/|guides\/|refarch\/|ecs-deploy-runner\/|infrastructure-pipelines\/|library\/|pipelines\/|reference\/|foundations\/)[^"']+)["']/g
    while ((match = standaloneDocRegex.exec(content)) !== null) {
      docIds.add(match[1])
    }
  }

  return docIds
}

// Normalize a link path to a doc ID
function normalizeLink(link, sourceFile) {
  // If it's an absolute path starting with /
  if (link.startsWith("/")) {
    // Remove leading slash and any file extension
    let normalized = link.slice(1)
    normalized = normalized.replace(/\.(md|mdx)$/, "")
    return normalized
  }

  // If it's a relative path
  if (link.startsWith(".")) {
    const sourceDir = path.dirname(sourceFile)
    const absolutePath = path.resolve(sourceDir, link)
    const relativeToDocs = path.relative(DOCS_DIR, absolutePath)
    return relativeToDocs.replace(/\.(md|mdx)$/, "")
  }

  // Already looks like a doc ID
  return link.replace(/\.(md|mdx)$/, "")
}

// Main function
function main() {
  console.log("🔍 Scanning documentation for orphaned pages...\n")

  // Get all doc files
  const allDocFiles = findAllDocFiles()
  console.log(`📚 Found ${allDocFiles.length} documentation files\n`)

  // Build a map of doc ID -> file path
  const docIdToFile = new Map()
  const fileToDocId = new Map()
  for (const file of allDocFiles) {
    const docId = pathToDocId(file)
    docIdToFile.set(docId, file)
    fileToDocId.set(file, docId)
  }

  // Collect all links from all files
  const incomingLinks = new Map() // docId -> Set of source docIds
  for (const docId of docIdToFile.keys()) {
    incomingLinks.set(docId, new Set())
  }

  for (const file of allDocFiles) {
    const sourceDocId = fileToDocId.get(file)
    const links = extractLinks(file)

    for (const link of links) {
      const normalizedLink = normalizeLink(link, file)

      // Try to find the target doc ID
      // Check exact match
      if (incomingLinks.has(normalizedLink)) {
        incomingLinks.get(normalizedLink).add(sourceDocId)
      }
      // Check with /index suffix
      else if (incomingLinks.has(normalizedLink + "/index")) {
        incomingLinks.get(normalizedLink + "/index").add(sourceDocId)
      }
      // Check without trailing index
      else if (
        normalizedLink.endsWith("/index") &&
        incomingLinks.has(normalizedLink.replace(/\/index$/, ""))
      ) {
        incomingLinks
          .get(normalizedLink.replace(/\/index$/, ""))
          .add(sourceDocId)
      }
    }
  }

  // Get sidebar doc IDs
  const sidebarDocIds = extractSidebarDocIds()
  console.log(`📑 Found ${sidebarDocIds.size} pages referenced in sidebars\n`)

  // Categorize pages
  const trulyOrphaned = []  // Not in sidebar AND no incoming links
  const sidebarOnly = []     // In sidebar but no content links
  const wellLinked = []      // Has incoming content links

  for (const [docId, sources] of incomingLinks) {
    const filePath = docIdToFile.get(docId)
    
    // Skip if matches exclude patterns
    const shouldExclude = EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath))
    if (shouldExclude) continue

    const inSidebar = sidebarDocIds.has(docId)
    const hasIncomingLinks = sources.size > 0

    if (hasIncomingLinks) {
      wellLinked.push({ docId, filePath: path.relative(DOCS_DIR, filePath), sources })
    } else if (inSidebar) {
      sidebarOnly.push({ docId, filePath: path.relative(DOCS_DIR, filePath) })
    } else {
      trulyOrphaned.push({ docId, filePath: path.relative(DOCS_DIR, filePath) })
    }
  }

  // Sort alphabetically
  trulyOrphaned.sort((a, b) => a.docId.localeCompare(b.docId))
  sidebarOnly.sort((a, b) => a.docId.localeCompare(b.docId))

  // Output results
  console.log("=" .repeat(70))
  console.log("📋 DOCUMENTATION LINK ANALYSIS REPORT")
  console.log("=" .repeat(70))
  
  console.log(`\n📊 Summary:`)
  console.log(`   Total docs analyzed: ${allDocFiles.length}`)
  console.log(`   Pages in sidebars: ${sidebarDocIds.size}`)
  console.log(`   Well-linked (has incoming content links): ${wellLinked.length}`)
  console.log(`   Sidebar-only (no content links): ${sidebarOnly.length}`)
  console.log(`   Truly orphaned (no sidebar, no links): ${trulyOrphaned.length}`)

  if (trulyOrphaned.length > 0) {
    console.log("\n" + "=" .repeat(70))
    console.log("🚨 TRULY ORPHANED PAGES (not in any sidebar, no incoming links)")
    console.log("   These pages are UNREACHABLE via normal navigation!")
    console.log("=" .repeat(70))
    for (const page of trulyOrphaned) {
      console.log(`\n  📄 ${page.docId}`)
      console.log(`     File: ${page.filePath}`)
    }
  }

  if (sidebarOnly.length > 0) {
    console.log("\n" + "=" .repeat(70))
    console.log("⚠️  SIDEBAR-ONLY PAGES (in sidebar but no content cross-links)")
    console.log("   These pages are reachable via sidebar but have no cross-references.")
    console.log("=" .repeat(70))
    for (const page of sidebarOnly) {
      console.log(`\n  📄 ${page.docId}`)
      console.log(`     File: ${page.filePath}`)
    }
  }

  console.log("\n" + "=" .repeat(70))
  console.log("✅ RECOMMENDATIONS")
  console.log("=" .repeat(70))
  console.log("\nFor TRULY ORPHANED pages:")
  console.log("  - Add to a sidebar, OR")
  console.log("  - Add links from related content pages, OR")
  console.log("  - Delete if no longer needed")
  console.log("\nFor SIDEBAR-ONLY pages:")
  console.log("  - Consider adding cross-references from related docs")
  console.log("  - This improves discoverability and SEO")
}

main()

