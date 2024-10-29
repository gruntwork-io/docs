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
const infrastructurePipelinesSidebars = require("./sidebars/infrastructure-pipelines.js")
const ecsDeployRunnerSidebars = require("./sidebars/ecs-deploy-runner.js")
const docsSidebar = require("./sidebars/docs.js")
const referenceSidebar = require("./sidebars/reference.js")

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  introSidebar,
  productionFrameworkSidebar,
  complianceSidebar,
  ...updateGuideSidebars,
  faqSidebars,
  infrastructurePipelinesSidebars,
  ecsDeployRunnerSidebars,
  docsSidebar,
  referenceSidebar,
}

module.exports = sidebars
