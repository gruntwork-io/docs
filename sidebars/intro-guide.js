const sidebar = [
  {
    label: "Overview",
    type: "category",
    collapsible: false,
    items: [
      "intro/overview/intro-to-gruntwork",
      "intro/overview/what-we-provide",
      "intro/overview/what-you-provide",
      "intro/overview/prerequisites",
      // Temporarily hiding the unfinished sections from the sidebar We'll put
      // them back shortly and don't want to delete the pages as we know we're
      // going to have these sections within a few days.
      // "intro/overview/gruntwork-production-framework",
      // "intro/overview/use-cases",
      // "intro/overview/gruntwork-vs-other",
      "intro/overview/getting-started",
    ],
  },
]

module.exports = sidebar
