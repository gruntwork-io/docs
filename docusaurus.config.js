// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gruntwork Docs",
  tagline: "Your entire infrastructure, defined as code, in about a day.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "/favicon.ico",
  organizationName: "gruntwork-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.,
  onBrokenLinks: "warn", // TODO: REMOVE THIS BEFORE MERGING!!!

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
  ],

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
            label: "Service Catalog API",
            docId: "reference/services/intro",
          },
          { to: "/courses", label: "Courses", position: "left" },
          {
            href: "https://github.com/gruntwork-io/knowledge-base/discussions",
            label: "Knowledge Base",
            position: "right",
          },
          {
            href: "/docs/guides/support",
            label: "Support",
            position: "right",
          },
          {
            href: "https://app.gruntwork.io",
            label: "Sign In",
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
                label: "Gruntwork.io",
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
                label: "Store",
                href: "https://store.gruntwork.io/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Knowledge Base",
                href: "https://github.com/gruntwork-io/knowledge-base/discussions",
              },
              {
                label: "Community Slack",
                href: "https://gruntwork-community.slack.com/archives/CHH9Y3Z62",
              },
              {
                label: "GitHub",
                href: "https://github.com/gruntwork-io",
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
                label: "Support",
                href: "/docs/guides/support",
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
                label: "Website Terms",
                href: "https://gruntwork.io/website-terms/",
              },
            ],
          },
        ],
        copyright: `© 2020 – ${new Date().getFullYear()} Gruntwork, Inc.`,
      },
      colorMode: {
        defaultMode: "light",
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
        additionalLanguages: ["hcl"],
      },
      zoomSelector: ".markdown img",
    }),
}

module.exports = config
