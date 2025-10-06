// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path")

const { themes } = require("prism-react-renderer")
const lightCodeTheme = themes.github
const darkCodeTheme = themes.nightOwl

const cfg = require("config")

const { redirects } = require("./src/redirects.js")

const algoliaConfig = cfg.has("algolia") ? cfg.get("algolia") : undefined

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

const buildVersion = cfg.has("app.buildVersion")
  ? cfg.get("app.buildVersion")
  : "N/A"

const plugins = ["plugin-image-zoom"]

const redirectPlugin = [
  "@docusaurus/plugin-client-redirects",
  {
    redirects,
  },
]

// @ts-ignore - types don't understand the plugin config
plugins.push(redirectPlugin)

const segmentPlugin = [
  "@twilio-labs/docusaurus-plugin-segment",
  {
    writeKey: "tVYixAoRAiTy0O7hBkB2TH2hMWFm0IW4",
    allowedInDev: false,
  },
]

// @ts-ignore - types don't understand the plugin config
plugins.push(segmentPlugin)

/** @type {import('@docusaurus/types').FasterConfig} */
const fasterConfig = {
  rspackBundler: true,
  swcHtmlMinimizer: true,
  lightningCssMinimizer: true,
  swcJsLoader: true,
  swcJsMinimizer: true,
  mdxCrossCompilerCache: true,
}

/** @type {() => Promise<import('@docusaurus/types').Config>} */
async function createConfig() {
  const captionsPlugin = (await import("./src/plugins/captions.mjs")).default

  return {
    future: {
      experimental_faster: fasterConfig,
    },
    title: "Gruntwork Docs",
    tagline:
      "Learn how to deploy and manage your entire infrastructure as code.",
    url: siteUrl,
    baseUrl: "/",
    favicon: "/favicon.ico",
    organizationName: "gruntwork-io", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.,

    stylesheets: [
      "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
    ],
    customFields: {
      libraryIndexName: algoliaConfig
        ? algoliaConfig.libraryIndexName
        : undefined,
    },
    headTags: [
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/66f30814ff6d7cdf-s.p.woff2", // Geist Mono
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/97ff73edc14fdb02-s.p.woff2", // General Sans Italic
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/a34f9d1faa5f3315-s.p.woff2", // General Sans Bold
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/d9532b38a05b0008-s.p.woff2", // General Sans Normal
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/55c55f0601d81cf3-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/26a46d62cd723877-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/97e0cb1ae144a2a9-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/581909926a08bbc8-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/df0a9ae256c0569c-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/6d93bde91c0c2823-s.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://gruntwork.io/_next/static/media/a34f9d1faa5f3315-s.p.woff2", // Inter
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      },
    ],
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: "/",
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/gruntwork-io/docs/edit/main/",
            exclude: [
              "guides/build-it-yourself/landing-zone/**",
              "guides/build-it-yourself/vpc/**",
              "**/node_modules/**",
            ],
            beforeDefaultRemarkPlugins: [captionsPlugin],
          },
          blog: false,
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
          googleTagManager: enableGoogleAnalytics
            ? {
                containerId: googleAnalyticsConfig.trackingID,
              }
            : undefined,
        }),
      ],
    ],

    plugins: plugins,

    markdown: {
      mermaid: true,
    },

    themes: ["@docusaurus/theme-mermaid"],

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
          hideOnScroll: true,
          items: [
            {
              type: "doc",
              position: "left",
              label: "Docs",
              docId: "index",
            },
            {
              type: "doc",
              label: "Reference",
              docId: "2.0/reference/index",
            },
            {
              type: "doc",
              label: "Release Notes",
              docId: "guides/stay-up-to-date/index",
            },
            {
              href: "https://github.com/gruntwork-io/knowledge-base/discussions",
              label: "Knowledge Base",
              position: "right",
            },
            {
              href: "/support",
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
                  href: "/support",
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
                  label: "Production Framework",
                  href: "/guides/production-framework",
                },
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
                  label: "Terragrunt",
                  href: "https://terragrunt.gruntwork.io",
                },
                {
                  label: "Terratest",
                  href: "https://terratest.gruntwork.io",
                },
                {
                  label: "Gruntwork Releases",
                  to: "/guides/stay-up-to-date",
                },
                {
                  label: "Style Guides",
                  to: "/guides/style",
                },
                {
                  label: "Support",
                  href: "/support",
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
        docs: {
          sidebar: {
            autoCollapseCategories: true,
          },
        },
        colorMode: {
          defaultMode: "light",
          disableSwitch: false,
          respectPrefersColorScheme: false,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: [
            "hcl",
            "python",
            "yaml",
            "json",
            "bash",
            "go",
            "docker",
          ],
        },
        algolia: algoliaConfig
          ? {
              appId: algoliaConfig.appId,
              // Public API key: safe to commit, but still sourced from config
              apiKey: algoliaConfig.apiKey,
              indexName: algoliaConfig.indexName,
              libraryIndexName: algoliaConfig.libraryIndexName,
              contextualSearch: true,
            }
          : undefined,
        zoomSelector: ".markdown :not(em) > img:not(.no-zoom)",
        metadata: [
          // https://docusaurus.io/docs/2.x/seo#global-metadata
          // This would become <meta name="keywords" content="..."/> in the generated HTML
          {
            name: "keywords",
            content:
              "gruntwork, devops, devops platform, infrastructure as code, iac, account factory, account vending, pipelines, terragrunt pipelines, opentofu, tofu, terraform, terragrunt, terratest, aws, devops library, devops tools, devops courses",
          },
          { name: "buildVersion", content: buildVersion },
          { name: "buildTime", content: new Date().toString() },
        ],
      }),
  }
}

module.exports = createConfig
