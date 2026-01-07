import React from "react"
import Layout from "@theme/Layout"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import styles from "./index.module.css"
import Card from "../components/Card"
import CardGroup from "../components/CardGroup"

export const HomeContent = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <main>
        <div>
          <h1>Getting Started</h1>
          <div>
            <p>
              Gruntwork provides a comprehensive library of pre-built modules,
              tools, and frameworks designed to accelerate the implementation of
              robust and scalable infrastructure solutions.
            </p>
          </div>
          <CardGroup cols={3}>
            <Card
              title="Learn About AWS Accelerator"
              href="/2.0/docs/overview/concepts/gruntworkplatform"
              icon="/img/icons/learn.svg"
            >
              Learn how Gruntwork's AWS Accelerator can help you deploy
              world-class infrastructure on AWS.
            </Card>
            <Card
              title="Create your Gruntwork Account"
              href="/2.0/docs/overview/getting-started/create-account"
              icon="/img/icons/deploy.svg"
            >
              Create your account in the Gruntwork Developer Portal and add your
              teammates.
            </Card>
            <Card
              title="Browse the AWS IaC Library"
              href="/library/reference"
              icon="/img/icons/refarch.svg"
            >
              Find a specific module in the AWS IaC Library
            </Card>
          </CardGroup>
        </div>
        <div style={{ margin: "6rem auto" }}>
          <h1>The Gruntwork Platform</h1>
          <p>
            The Gruntwork Platform provides the foundations for a streamlined,
            end-to-end DevOps workflow that's secure, scalable, and easy to
            maintain.
          </p>
          <CardGroup cols={2} commonCardProps={{ appearance: "flush" }}>
            <Card
              title="Gruntwork Pipelines"
              href="/2.0/docs/pipelines/concepts/overview"
            >
              A framework for running secure deployments for infrastructure code
              and application code.
            </Card>
            <Card
              title="AWS Account Factory"
              href="/2.0/docs/accountfactory/concepts/"
            >
              Create and manage AWS accounts with best-practice baselines,
              security configurations, and compliance.
            </Card>
            <Card title="Patcher" href="/2.0/docs/patcher/concepts/">
              Keep your infrastructure up to date, with support for automatic
              updates and patches for any breaking changes.
            </Card>
            <Card title="AWS IaC Library" href="/2.0/docs/library/concepts/overview">
              A collection of reusable Infrastructure as Code modules that enables you to deploy and
              manage AWS infrastructure quickly and reliably.
            </Card>
          </CardGroup>
        </div>
        <div style={{ margin: "6rem auto" }}>
          <h1>Gruntwork’s Open Source Tools</h1>
          <p>
            All of Gruntwork’s products are built atop a suite of trusted open
            source tools that we maintain.
          </p>
          <CardGroup commonCardProps={{ appearance: "flush" }}>
            <Card title="Terragrunt" href="https://terragrunt.gruntwork.io">
              Terragrunt is a thin wrapper that provides extra tools for keeping
              your Terraform configurations DRY, working with multiple modules,
              and managing remote state.
            </Card>
            <Card title="Terratest" href="https://terratest.gruntwork.io">
              Terratest is a Go library that provides patterns and helper
              functions for testing infrastructure, with 1st-class support for
              Terraform, Packer, Docker, Kubernetes, AWS, GCP, and more.
            </Card>
            <Card
              title="Boilerplate"
              href="https://github.com/gruntwork-io/boilerplate"
            >
              Boilerplate is a Go Library and Command that makes rendering
              "boilerplate" content as part of devops pipelines easy.
            </Card>
          </CardGroup>
        </div>
      </main>
    </>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Documentation and guides for Gruntwork's tools and services">
      <HomeContent />
    </Layout>
  )
}
