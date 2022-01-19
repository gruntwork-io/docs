// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")
const cfg = require("config")

const captionsPlugin = require("./src/plugins/captions")

const algoliaConfig = cfg.has("algolia") ? cfg.get("algolia") : undefined

const posthogConfig = cfg.has("posthog") ? cfg.get("posthog") : undefined
const enablePosthog = posthogConfig && posthogConfig.apiKey

const googleAnalyticsConfig = cfg.has("googleAnalytics")
  ? cfg.get("googleAnalytics")
  : undefined
const enableGoogleAnalytics =
  googleAnalyticsConfig && googleAnalyticsConfig.trackingID

const siteUrl = cfg.has("siteUrl")
  ? cfg.get("siteUrl")
  : process.env["NETLIFY"]
  ? process.env["DEPLOY_URL"]
  : "http://localhost:3000"

const plugins = ["plugin-image-zoom"]

if (enablePosthog) {
  plugins.push("posthog-docusaurus")
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gruntwork Docs",
  tagline: "Learn how to deploy and manage your entire infrastructure as code.",
  url: siteUrl,
  baseUrl: "/",
  favicon: "/favicon.ico",
  organizationName: "gruntwork-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.,

  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
          beforeDefaultRemarkPlugins: [captionsPlugin],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: enableGoogleAnalytics
          ? {
              trackingID: googleAnalyticsConfig.trackingID,
              anonymizeIP: true,
            }
          : undefined,
      },
    ],
  ],

  plugins: plugins,

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
            docId: "intro/overview/intro-to-gruntwork",
          },
          {
            type: "doc",
            position: "left",
            label: "Guides",
            docId: "guides/index",
            activeBasePath: "docs/guides",
          },
          {
            type: "doc",
            position: "left",
            label: "Service Catalog API",
            docId: "reference/services/intro",
          },
          { to: "/docs/courses", label: "Courses", position: "left" },
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
          {
            type: "dropdown",
            label: "More…",
            position: "right",
            id: "more_dropdown",
            items: [
              {
                href: "https://github.com/gruntwork-io/knowledge-base/discussions",
                label: "Knowledge Base",
              },
              {
                href: "/docs/guides/support",
                label: "Support",
              },
              {
                href: "https://app.gruntwork.io",
                label: "Sign In",
              },
            ],
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
      algolia: algoliaConfig
        ? {
            appId: algoliaConfig.appId,
            // Public API key: safe to commit, but still sourced from config
            apiKey: algoliaConfig.apiKey,
            indexName: algoliaConfig.indexName,
            contextualSearch: true,
          }
        : undefined,
      zoomSelector: ".markdown img",
      posthog: enablePosthog
        ? {
            apiKey: posthogConfig.apiKey,
            appUrl: posthogConfig.appUrl,
          }
        : undefined,
    }),
}

module.exports = config
