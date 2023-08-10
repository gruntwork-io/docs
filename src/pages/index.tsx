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
            to="/intro/overview/intro-to-gruntwork"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout description="Documentation and guides for Gruntwork's tools and services">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <CardGroup>
              <Card
                title="What is Gruntwork?"
                href="/intro/overview/intro-to-gruntwork"
                icon="/img/icons/learn.svg"
              >
                Learn how Gruntwork products can help you deploy a world class
                infrastructure.
              </Card>
              <Card
                title="The Reference Architecture"
                href="/refarch/configuration/"
                icon="/img/icons/refarch.svg"
              >
                Bought a Reference Architecture? Get your new infrastructure up
                and running quickly with our getting started guide.
              </Card>
              <Card
                title="Developer Portal"
                href="/developer-portal/create-account"
                icon="/img/icons/deploy.svg"
              >
                Create your account in the Gruntwork Developer Portal and add
                your teammates.
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Products</h2>
            <CardGroup commonCardProps={{ appearance: "invisible" }}>
              <Card title="Gruntwork Library" href="/library/overview/">
                A collection of reusable code that enables you to deploy and
                manage infrastructure quickly and reliably.
              </Card>
              <Card title="Gruntwork Pipelines" href="/pipelines/overview">
                A framework for running secure deployments for infrastructure
                code and application code.
              </Card>
              <Card title="Gruntwork Patcher" href="/patcher">
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
                title="Gruntwork Installer"
                href="https://github.com/gruntwork-io/gruntwork-installer"
              >
                The Gruntwork Installer provides conveniences for downloading
                and installing Gruntwork modules.
              </Card>
            </CardGroup>
          </div>
        </section>
      </main>
    </Layout>
  )
}
