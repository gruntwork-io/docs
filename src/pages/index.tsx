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
            to="/docs/intro/overview/intro-to-gruntwork"
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
                href="/docs/intro/overview/intro-to-gruntwork"
                icon="/img/icons/learn.svg"
              >
                Learn how Gruntwork products can help you deploy a world class
                infrastructure.
              </Card>
              <Card
                title="The Reference Architecture"
                href="/docs/guides/reference-architecture"
                icon="/img/icons/refarch.svg"
              >
                Bought a Reference Architecture? Get your new infrastructure up
                and running quickly with our comprehensive guide.
              </Card>
              <Card
                title="Deploy A Service"
                href="/docs/guides#build-your-own-architecture"
                icon="/img/icons/deploy.svg"
              >
                Follow our tutorials and learn how to deploy Gruntwork services
                to construct your own bespoke architecture.
              </Card>
            </CardGroup>
          </div>
          <div className="container" style={{ margin: "6rem auto" }}>
            <h2>Discover Your Use Case</h2>
            <CardGroup commonCardProps={{ appearance: "invisible" }}>
              <Card
                title="Set Up Your Multi-account Structure"
                href="/docs/guides/build-it-yourself/landing-zone"
              >
                Streamline how you create, configure, and secure your AWS
                accounts using Gruntwork Landing Zone.
              </Card>
              <Card
                title="Create an Infra CI/CD Pipeline"
                href="/docs/guides/build-it-yourself/pipelines"
              >
                Use your preferred CI tool to set up an end‑to‑end pipeline for
                your infrastructure code.
              </Card>
              <Card
                title="Configure Your Network"
                href="/docs/guides/build-it-yourself/vpc"
              >
                Set up your network according to industry best practices using
                our VPC service.
              </Card>
              <Card
                title="Deploy a Kubernetes Cluster"
                href="/docs/guides/build-it-yourself/kubernetes-cluster"
              >
                Deploy Kubernetes using EKS to host all of your apps and
                services.
              </Card>
              <Card
                title="Achieve Compliance"
                href="/docs/guides/build-it-yourself/achieve-compliance"
              >
                Implement the CIS AWS Foundations Benchmark using our curated
                collection of modules and services.
              </Card>
            </CardGroup>
          </div>
        </section>
      </main>
    </Layout>
  )
}
