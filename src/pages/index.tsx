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
                Learn what Gruntwork is and how its products can help you deploy
                a world class infrastructure.
              </Card>
              <Card
                title="The Reference Architecture"
                href="/docs/guides/reference-architecture/overview/overview"
                icon="/img/icons/refarch.svg"
              >
                Bootstrap your infrastructure in about a day by letting
                Gruntwork deploy a Reference Architecture customized just for
                you.
              </Card>
              <Card
                title="Deploy A Service"
                href="/docs/guides/build-it-yourself/overview"
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
                title="Set Up Your Accounts"
                href="/docs/guides/build-it-yourself/landing-zone/intro/what-youll-learn-in-this-guide"
              >
                Streamline how you create, configure, and secure AWS accounts
                and multi-account structures.
              </Card>
              <Card
                title="Create a CI/CD Pipeline"
                href="/docs/guides/build-it-yourself/pipelines/intro/what-youll-learn-in-this-guide"
              >
                Use your preferred CI tool to set up an end‑to‑end pipeline for
                your infrastructure code.
              </Card>
              <Card
                title="Configure Your Network"
                href="/docs/guides/build-it-yourself/vpc/intro/what-youll-learn-in-this-guide"
              >
                Set up your network according to industry best practices using
                our VPC service.
              </Card>
              <Card
                title="Deploy a Kubernetes Cluster"
                href="/docs/guides/build-it-yourself/kubernetes-cluster/intro/what-youll-learn-in-this-guide"
              >
                Deploy a Kubernetes Cluster to host all of your apps and
                services.
              </Card>
              <Card
                title="Achieve Compliance"
                href="/docs/guides/build-it-yourself/achieve-compliance/intro/what-youll-learn-in-this-guide"
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
