const fs = require("fs")

const stayUpToDateIndexFile = fs.readFileSync(
  "docs/guides/stay-up-to-date/index.md",
  "utf8"
)

const stayUpToDateIndexFileInDocsSources = fs.readFileSync(
  "_docs-sources/guides/stay-up-to-date/index.md",
  "utf8"
)

const releasesPlaceholder =
  "<!-- replaced-by-docs-sourcer-automatically-do-not-edit -->"

describe("Guides: stay-up-to-date index file", () => {
  // This a temporary workaround to prevent the inadvertent changes to the
  // placeholder or the index page in docs from being overwritten with the
  // releases placeholder & committed to the main branch. The local plugin
  // of the docs-sourcer package automatically copies `_docs-sources/` into `docs`
  // When this test fails, revert the change made to `docs/guides/stay-up-to-date/index.md`
  // or `_docs-sources/guides/stay-up-to-date/index.md`
  it("should have releases placeholder in only _docs-sources", () => {
    expect(stayUpToDateIndexFileInDocsSources).toContain(releasesPlaceholder)
    expect(stayUpToDateIndexFile).not.toContain(releasesPlaceholder)
  })
})
