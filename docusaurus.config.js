// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gruntwork Docs",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "/favicon.ico",
  organizationName: "gruntwork-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.,

  stylesheets: ["https://fonts.googleapis.com/css?family=Source+Sans+Pro"],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: ["plugin-image-zoom"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "Gruntwork Logo",
          src: "img/logo-dark.png",
          srcDark: "img/logo-light.png",
        },
        items: [
          {
            type: "doc",
            position: "left",
            label: "Intro",
            docId: "intro/overview/world-class-devops",
          },
          {
            type: "doc",
            position: "left",
            label: "Guides",
            docId: "guides/welcome",
          },
          {
            type: "doc",
            position: "left",
            label: "Reference",
            docId: "reference/services/intro",
          },
          { to: "/courses", label: "Courses", position: "left" },
          {
            href: "https://github.com/gruntwork-io",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://github.com/gruntwork-io/knowledge-base/discussions",
            label: "Discussions",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Company",
            items: [
              {
                label: "About Gruntwork",
                href: "https://gruntwork.io",
              },
              {
                label: "Blog",
                href: "https://blog.gruntwork.io/",
              },
              {
                label: "Newsletter",
                href: "https://gruntwork.io/newsletter/",
              },
              {
                label: "Gruntwork Store",
                href: "https://store.gruntwork.io/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub Discussions",
                href: "https://github.com/gruntwork-io/knowledge-base/discussions"
              },
              {
                label: "Community Slack",
                href: "https://gruntwork-community.slack.com/archives/CHH9Y3Z62"
              },
              {
                label: "Twitter",
                href: "https://twitter.com/gruntwork_io",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Developer Portal",
                href: "https://app.gruntwork.io",
              },
              {
                label: "IaC Library on GitHub",
                href: "https://github.com/gruntwork-io",
              },
              {
                label: "DevOps Checklist",
                href: "https://gruntwork.io/devops-checklist/",
              },
              {
                label: "Learning Resources",
                href: "https://gruntwork.io/devops-resources/",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy Policy",
                href: "https://gruntwork.io/legal/privacy-policy/",
              },
              {
                label: "Cookie Policy",
                href: "https://gruntwork.io/legal/cookie-policy/",
              },
              {
                label: "Terms of Service",
                href: "https://gruntwork.io/terms/",
              },
            ],
          },
        ],
        copyright: `© 2020 – ${new Date().getFullYear()} Gruntwork, Inc.`,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: false,
        /* we clear these icons out and use CSS to swap in our own images instead */
        switchConfig: {
          darkIcon: " ",
          lightIcon: " ",
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoomSelector: ".markdown img",
    }),
}

module.exports = config
