const fs = require("fs")

const stayUpToDateIndexFile = fs.readFileSync(
  "docs/guides/stay-up-to-date/index.md",
  "utf8"
)

const stayUpToDateIndexFileInDocsSources = fs.readFileSync(
  "docs_sources/guides/stay-up-to-date/index.md",
  "utf8"
)

const releasesPlaceholder =
  "<!-- replaced-by-docs-sourcer-automatically-do-not-edit -->"

describe("Guides: stay-up-to-date index file", () => {
  it("should have releases placeholder in only docs_sources", () => {
    expect(stayUpToDateIndexFileInDocsSources).toContain(releasesPlaceholder)

    // This a temporary workaround to prevent the index.page from being overwritten
    // with the releases placeholder & committed to the main branch. The local plugin
    // of the docs-sourcer package automatically copies `_docs_sources_/` into `docs`
    // When this test fails, revert the change made to `docs/guides/stay-up-to-date/index.md`
    expect(stayUpToDateIndexFile).not.toContain(releasesPlaceholder)
  })
})
