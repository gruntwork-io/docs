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
    <h1>Gruntwork Docs</h1>
    <main>
        <div>
          <p>Gruntwork provides a comprehensive library of pre-built modules, tools, and frameworks
            designed to accelerate the implementation of robust and scalable infrastructure solutions.</p>
        </div>
        <section className={styles.features}>
          <div className="container">
            <h2>Getting Started</h2>
            <CardGroup cols={3}>
              <Card
                title="Lean About DevOps Foundations"
                href="/2.0/docs/overview/concepts/devopsfoundations"
                icon="/img/icons/learn.svg"
              >
                Learn how Gruntwork's DevOps Foundations can help you deploy a world class
                infrastructure.
              </Card>
              <Card
                title="Create your Gruntwork Account"
                href="/2.0/docs/overview/getting-started/create-account"
                icon="/img/icons/deploy.svg"
              >
                Create your account in the Gruntwork Developer Portal and add
                your teammates.
              </Card>
              <Card
                title="Browse the Library Reference"
                href="/library/reference"
                icon="/img/icons/refarch.svg"
              >
                Find a specific module in the Gruntwork Library
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Gruntwork's Products</h2>
            <CardGroup cols={4} commonCardProps={{ appearance: "invisible" }}>
              <Card title="Pipelines" href="/2.0/docs/pipelines/concepts/overview">
                A framework for running secure deployments for infrastructure
                code and application code.
              </Card>
              <Card title="Account Factory" href="/2.0/docs/account-factory/concepts/overview">
                A tool for creating and managing AWS accounts with a focus on
                security and compliance.
              </Card>
              <Card title="Patcher" href="/2.0/docs/patcher/concepts/">
                Keep your infrastructure up to date, with support for automatic
                updates and patches for any breaking changes.
              </Card>
              <Card title="Library" href="/2.0/docs/library/concepts/overview">
                A collection of reusable code that enables you to deploy and
                manage infrastructure quickly and reliably.
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Gruntwork's Open Source Tools</h2>
            <CardGroup commonCardProps={{ appearance: "invisible" }}>
              <Card title="Terragrunt" href="https://terragrunt.gruntwork.io">
                Terragrunt is a thin wrapper that provides extra tools for
                keeping your Terraform configurations DRY, working with multiple
                modules, and managing remote state.
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
                Boilerplate is a Go Library and Command that makes rendering "boilerplate"
                content as part of devops pipelines easy.
              </Card>
            </CardGroup>
          </div>
        </section>
      </main>
       </>
      );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Documentation and guides for Gruntwork's tools and services">
      <HomeContent />
    </Layout>
  )
}
