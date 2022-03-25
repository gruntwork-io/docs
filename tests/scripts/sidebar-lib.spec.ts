const path = require("path")
const {
  generateSidebar,
  generateMultiSidebar,
  formatName,
  isCategoryIndexFilePredicate,
  isSupportedFileType,
  toOutputDocId,
} = require("../../scripts/sidebar-lib")

function sampleDataPath(filepath) {
  return path.resolve(
    path.join("tests/sample-data/scripts/sidebar-data", filepath)
  )
}

function docId(filepath) {
  return path.join("tests/sample-data/scripts/sidebar-data", filepath)
}

function findSidebarSectionByName(sidebar, name) {
  const sectionObj = sidebar.find(
    (item) => typeof item === "object" && item[name] !== undefined
  )
  return sectionObj[name]
}

describe("Script:generate-sidebar", () => {
  describe("Function:generateSidebar", () => {
    test("Returns undefined for a bogus path", async () => {
      try {
        await generateSidebar("bogus/path")
        fail("Did not throw")
      } catch (_e) {}
    })

    test("Returns undefined for a non-directory file", async () => {
      const sidebar = await generateSidebar(sampleDataPath("file.md"))
      expect(sidebar).toBeUndefined()
    })

    test.skip("Supports a flat list of files", async () => {
      const sidebar = await generateSidebar(sampleDataPath("flat-list"))
      expect(sidebar.length).toBe(3)
      expect(sidebar).toContain(docId("flat-list/foo"))
      expect(sidebar).toContain(docId("flat-list/bar"))
      expect(sidebar).toContain(docId("flat-list/baz"))
    })

    test.skip("Supports hierarchical sets of files", async () => {
      const sidebar = await generateSidebar(sampleDataPath("hierarchy"))
      expect(sidebar.length).toBe(6)
      expect(sidebar).toContain(docId("hierarchy/foo"))
      expect(sidebar).toContain(docId("hierarchy/bar"))
      expect(sidebar).toContain(docId("hierarchy/baz"))
      const firstSection = findSidebarSectionByName(sidebar, "First Section")
      const secondSection = findSidebarSectionByName(sidebar, "Second Section")
      const thirdSection = findSidebarSectionByName(sidebar, "Third Section")
      expect(firstSection.length).toBe(3)
      expect(secondSection.length).toBe(3)
      expect(thirdSection.length).toBe(3)
    })

    test("Ignores files of unsupported type", async () => {
      const sidebar = await generateSidebar(sampleDataPath("more-types"))
      expect(sidebar.length).toBe(3)
      expect(sidebar).not.toContain(docId("flat-list/text"))
      expect(sidebar).not.toContain(docId("flat-list/script"))
      expect(sidebar).not.toContain(docId("flat-list/_category_"))
    })

    test.skip("Applies the category index convention", async () => {
      const sidebar = await generateSidebar(sampleDataPath("category-index"))
      expect(sidebar.length).toBe(1)
      const indexItem = sidebar[0]
      expect(indexItem.type).toBe("category")
      expect(indexItem.label).toBe("Category Index")
      expect(indexItem.items.length).toBe(3)
      expect(indexItem.link.type).toBe("doc")
      expect(indexItem.link.id).toBe(docId("category-index/index"))
    })

    test.skip("Can include a back button", async () => {
      const sidebar = await generateSidebar(sampleDataPath("flat-list"), {
        backButton: "Back",
      })
      expect(sidebar.length).toBe(4)
      const backButton = sidebar[0]
      expect(backButton.type).toBe("link")
      expect(backButton.label).toBe("Back")
      expect(backButton.className).toBe("back-button")
      expect(backButton.href).toBe("/" + docId(".")) // must be absolute
    })

    test("Back button only appears at the top level", async () => {
      const sidebar = await generateSidebar(sampleDataPath("hierarchy"), {
        backButton: "Back",
      })
      const firstSection = findSidebarSectionByName(sidebar, "First Section")
      expect(firstSection[0].label).not.toBe("Back")
    })
  })

  describe("Function:GenerateMultiSidebar", () => {
    test("Generates an object with sidebars for each directory", async () => {
      const dirs = [
        sampleDataPath("flat-list"),
        sampleDataPath("more-types"),
        sampleDataPath("hierarchy"),
      ]
      const sidebars = await generateMultiSidebar(dirs)
      expect(Object.keys(sidebars).length).toBe(3)
    })

    test.skip("Adds a back button to each sidebar", async () => {
      const dirs = [
        sampleDataPath("flat-list"),
        sampleDataPath("more-types"),
        sampleDataPath("hierarchy"),
      ]
      const sidebars = await generateMultiSidebar(dirs, {
        backButton: "Back",
      })
      Object.values(sidebars).forEach((sidebar) => {
        const backButton = sidebar[0]
        expect(backButton.type).toBe("link")
        expect(backButton.label).toBe("Back")
        expect(backButton.className).toBe("back-button")
        expect(backButton.href).toBe("/" + docId(".")) // must be absolute
      })
    })
  })

  describe("Helpers", () => {
    describe("Function:formatName", () => {
      test("Converts hyphens to spaces", () => {
        const formattedName = formatName("name-with-dashes")
        expect(formattedName).toBe("Name With Dashes")
      })

      test("Consolidates whitespace", () => {
        const formattedName = formatName("name with  extra   whitespace")
        expect(formattedName).toBe("Name With Extra Whitespace")
      })

      test("Converts to title case", () => {
        let formattedName
        formattedName = formatName("lowercase-title")
        expect(formattedName).toBe("Lowercase Title")
      })

      test("Leaves acronyms uppercase", () => {
        let formattedName
        formattedName = formatName("ABC-acronym")
        expect(formattedName).toBe("ABC Acronym")
      })

      test.skip("Leaves articles lowercase", () => {
        let formattedName
        formattedName = formatName("read-the-manual")
        expect(formattedName).toBe("Read the Manual")
      })

      test.skip("Leaves conjunctions lowercase", () => {
        let formattedName
        formattedName = formatName("that-and-that")
        expect(formattedName).toBe("This and That")
      })

      test("Supports title with numbers", () => {
        let formattedName
        formattedName = formatName("1-is-the-loneliest")
        expect(formattedName).toBe("1 Is The Loneliest")
      })
    })

    describe("Function:isCategoryIndexFilePredicate", () => {
      test("Returns false for Markdown files not named index", () => {
        const b = isCategoryIndexFilePredicate(sampleDataPath("file.md"))
        expect(b).toBeFalsy()
      })

      test.skip("Returns false for directories (even if named index)", () => {
        const b = isCategoryIndexFilePredicate(sampleDataPath("index"))
        expect(b).toBeFalsy()
      })

      test("Returns false for non-Markdown files named index", () => {
        const b = isCategoryIndexFilePredicate(sampleDataPath("index.txt"))
        expect(b).toBeFalsy()
      })

      test("Returns true for Markdown files named index", () => {
        const b = isCategoryIndexFilePredicate(sampleDataPath("index.md"))
        expect(b).toBeTruthy()
      })

      test("Returns true for MDX files named index", () => {
        const b = isCategoryIndexFilePredicate(sampleDataPath("index.mdx"))
        expect(b).toBeTruthy()
      })
    })

    describe("Function:isSupportedFileType", () => {
      test("Returns true for Markdown files", () => {
        const b = isSupportedFileType(sampleDataPath("index.md"))
        expect(b).toBeTruthy()
      })

      test("Returns true for MDX files", () => {
        const b = isSupportedFileType(sampleDataPath("page.mdx"))
        expect(b).toBeTruthy()
      })

      test("Returns false for JS files", () => {
        const b = isSupportedFileType(sampleDataPath("script.js"))
        expect(b).toBeFalsy()
      })

      test("Returns false _category_.json files", () => {
        const b = isSupportedFileType(sampleDataPath("_category_.json"))
        expect(b).toBeFalsy()
      })

      test("Returns false for text files", () => {
        const b = isSupportedFileType(sampleDataPath("index.txt"))
        expect(b).toBeFalsy()
      })

      test("Returns false for non-existent files", () => {
        const b = isSupportedFileType(sampleDataPath("bogus.foo"))
        expect(b).toBeFalsy()
      })
    })

    describe("Function:toOutputDocId", () => {
      test("Generates proper docId for files inside _docs-sources", () => {
        const docId = toOutputDocId(
          "/any/absolute/path/that/ends/with/_docs-sources/foo/bar/baz.md"
        )
        expect(docId).toBe("foo/bar/baz")
      })

      test("Generates proper docId for files inside output docs", () => {
        const docId = toOutputDocId(
          "/any/absolute/path/that/ends/with/docs/foo/bar/baz.md"
        )
        expect(docId).toBe("foo/bar/baz")
      })
    })
  })
})
