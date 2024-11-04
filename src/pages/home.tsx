import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import styles from "./index.module.css"
import Card from "../components/Card"
import CardGroup from "../components/CardGroup"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title hideOnMobile">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/2.0/docs/overview/getting-started/create-account"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export const HomeContent = () => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
    <HomepageHeader />
    <main>
        <section className={styles.features}>
          <div className="container">
            <CardGroup>
              <Card
                title="What is Gruntwork?"
                href="/2.0/docs/overview/concepts/devopsfoundations"
                icon="/img/icons/learn.svg"
              >
                Learn how Gruntwork's Devops Foundations can help you deploy a world class
                infrastructure.Test
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
                title="Library Reference"
                href="/library/reference"
                icon="/img/icons/refarch.svg"
              >
                Find a specific module in the Gruntowrk Library
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Products</h2>
            <CardGroup commonCardProps={{ appearance: "invisible" }}>
              <Card title="Gruntwork Library" href="/2.0/docs/library/concepts/overview">
                A collection of reusable code that enables you to deploy and
                manage infrastructure quickly and reliably.
              </Card>
              <Card title="Gruntwork Pipelines" href="/2.0/docs/pipelines/concepts/overview">
                A framework for running secure deployments for infrastructure
                code and application code.
              </Card>
              <Card title="Gruntwork Patcher" href="/2.0/docs/patcher/concepts/">
                Keep your infrastructure up to date, with support for automatic
                updates and patches for any breaking changes.
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Learn New Tools</h2>
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
