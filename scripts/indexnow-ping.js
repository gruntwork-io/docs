#!/usr/bin/env node
// Submits the freshly built sitemap to IndexNow (Bing, Yandex, Seznam, Naver).
// Runs only on Vercel production deploys; no-op everywhere else.
// Failures are logged but never fail the build — search engine pings are non-critical.

const fs = require("fs")
const path = require("path")

const HOST = "docs.gruntwork.io"
const KEY = "2d0b95fae1af47422bbfbb199a3ff13a"
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = "https://api.indexnow.org/indexnow"
const SITEMAP_PATH = path.join(__dirname, "..", "build", "sitemap.xml")
const BATCH_SIZE = 10000

function log(msg) {
  console.log(`[indexnow] ${msg}`)
}

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    log(`skipping (VERCEL_ENV=${process.env.VERCEL_ENV || "unset"})`)
    return
  }

  if (!fs.existsSync(SITEMAP_PATH)) {
    log(`sitemap not found at ${SITEMAP_PATH}, skipping`)
    return
  }

  const xml = fs.readFileSync(SITEMAP_PATH, "utf8")
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    .map((m) => m[1].trim())
    .filter((u) => {
      try {
        return new URL(u).host === HOST
      } catch {
        return false
      }
    })

  if (urls.length === 0) {
    log("no URLs found in sitemap matching production host, skipping")
    return
  }

  log(`submitting ${urls.length} URLs to ${ENDPOINT}`)

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      })
      log(`batch ${i / BATCH_SIZE + 1} (${batch.length} URLs): HTTP ${res.status}`)
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        log(`response body: ${text.slice(0, 500)}`)
      }
    } catch (err) {
      log(`batch ${i / BATCH_SIZE + 1} failed: ${err.message}`)
    }
  }
}

main().catch((err) => {
  log(`unexpected error: ${err.message}`)
})
