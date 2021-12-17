import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import styles from "./index.module.css"
import Card from "../components/Card"
import Grid from "../components/Grid"

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
            Get Started{" "}
            <span className="hideOnMobile">With the Gruntwork Tutorial</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Gruntwork Docs`}
      description="Documentation and guides for Gruntwork's tools and services"
    >
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <Grid cols={3} gap="2rem">
                <Card
                  title="Set Up Your Accounts"
                  href="/docs/guides/build-it-yourself/landing-zone/intro/what-youll-learn-in-this-guide"
                >
                  Streamline how you create, configure, and secure AWS accounts
                  and multi-account structures.
                </Card>
                <Card
                  title="Configure a CI/CD Pipeline"
                  href="/docs/guides/build-it-yourself/pipelines/intro/what-youll-learn-in-this-guide"
                >
                  Use your preferred CI tool to set up an end‑to‑end pipeline
                  for your infrastructure code.
                </Card>
                <Card
                  title="Achieve Compliance"
                  href="/docs/guides/build-it-yourself/achieve-compliance/intro/what-youll-learn-in-this-guide"
                >
                  Implement the CIS AWS Foundations Benchmark using our curated
                  collection of modules and services.
                </Card>
                <Card
                  title="The Reference Architecture"
                  href="/docs/guides/reference-architecture/overview/overview"
                >
                  Bootstrap your infrastructure in about a day by letting
                  Gruntwork deploy a Reference Architecture customized just for
                  you.
                </Card>
                <Card
                  title="Deploy a Service"
                  href="/docs/guides/build-it-yourself/overview"
                >
                  Learn how to deploy Gruntwork services to construct your own
                  bespoke architecture.
                </Card>
                <Card title="Courses" href="/docs/courses">
                  Learn DevOps fundamentals with our series of introductory
                  video tutorials.
                </Card>
              </Grid>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
