/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const introSidebar = require("./sidebars/intro-guide.js")
const guidesSidebar = require("./sidebars/guides-index.js")
const productionFrameworkSidebar = require("./sidebars/production-framework-guide.js")
const refarchUsageSidebar = require("./sidebars/refarch-usage-guide.js")
const landingZoneSidebar = require("./sidebars/landing-zone-guide.js")
const pipelineSidebar = require("./sidebars/pipelines-guide.js")
const vpcSidebar = require("./sidebars/vpc-guide.js")
const kubernetesSidebar = require("./sidebars/kubernetes-guide.js")
const complianceSidebar = require("./sidebars/compliance-guide.js")
const updateGuideSidebars = require("./sidebars/update-guides.js")
const apiSidebars = require("./sidebars/api-reference.js")
const faqSidebars = require("./sidebars/faq.js")
const iacSiderbars = require("./sidebars/iac.js")
const developerPortalSidebars = require("./sidebars/developer-portal.js")

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introSidebar,
  guidesSidebar,
  productionFrameworkSidebar,
  refarchUsageSidebar,
  landingZoneSidebar,
  pipelineSidebar,
  vpcSidebar,
  kubernetesSidebar,
  complianceSidebar,
  ...updateGuideSidebars,
  ...apiSidebars,
  faqSidebars,
  iacSiderbars,
  developerPortalSidebars,
}

module.exports = sidebars
