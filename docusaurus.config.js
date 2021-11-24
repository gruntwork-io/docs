// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gruntwork Docs",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gruntwork-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.,

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
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/main/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    "plugin-image-zoom",
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Gruntwork Docs",
        logo: {
          alt: "Gruntwork Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            position: "left",
            label: "Intro",
            docId: "intro/overview/world-class-devops"
          },
          {
            type: "doc",
            position: "left",
            label: "Guides",
            docId: "guides/welcome"
          },
          {
            type: "dropdown",
            position: "left",
            label: "Reference",
            to: "/docs/reference/intro",
            items: [
              {
                label: "Services",
                type: "doc",
                docId: "reference/services/stub",
              },
              {
                label: "Modules",
                type: "doc",
                docId: "reference/modules/stub",
              },
              {
                label: "Tools",
                type: "doc",
                docId: "reference/tools/stub",
              },
            ],
          },
          { to: "/courses", label: "Courses", position: "left" },
          {
            href: "https://github.com/gruntwork-io",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://gruntwork-community.slack.com/archives/CHH9Y3Z62",
            label: "Discussions",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoomSelector: ".markdown img",
    }),
};

module.exports = config;
