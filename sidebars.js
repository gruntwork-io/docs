/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const introSidebar = require("./sidebars/intro-guide.js")
const productionFrameworkSidebar = require("./sidebars/production-framework-guide.js")
const complianceSidebar = require("./sidebars/compliance-guide.js")
const updateGuideSidebars = require("./sidebars/update-guides.js")
const faqSidebars = require("./sidebars/faq.js")
const librarySidebars = require("./sidebars/library.js")
const libraryRefSidebars = require("./sidebars/library-reference.js")
const developerPortalSidebars = require("./sidebars/developer-portal.js")
const patcherSidebars = require("./sidebars/patcher.js")
const pipelinesSidebars = require("./sidebars/pipelines.js")
const pipelinesV1Sidebars = require("./sidebars/pipelines-v1.js")
const landingZoneSidebars = require("./sidebars/landing-zone.js")
const refarchSidebar = require("./sidebars/refarch.js")

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introSidebar,
  productionFrameworkSidebar,
  complianceSidebar,
  ...updateGuideSidebars,
  faqSidebars,
  librarySidebars,
  developerPortalSidebars,
  patcherSidebars,
  pipelinesSidebars,
  pipelinesV1Sidebars,
  landingZoneSidebars,
  refarchSidebar,
  libraryRefSidebars,
}

module.exports = sidebars
