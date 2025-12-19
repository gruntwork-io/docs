import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const QUICK_LINKS = [
  {
    title: 'Terragrunt Scale',
    description: 'CI/CD pipelines, drift detection, and updates for Terragrunt',
    href: '/docs/terragrunt-scale/intro',
    icon: '⚡',
  },
  {
    title: 'AWS Accelerator',
    description: 'Get started with AWS Landing Zones and best practices',
    href: '/docs/aws-accelerator/intro',
    icon: '🚀',
  },
  {
    title: 'The Gruntwork Way',
    description: 'Learn our opinionated approach to DevOps and IaC',
    href: '/docs/way/intro',
    icon: '📖',
  },
  {
    title: 'Open Source',
    description: 'Terragrunt, Terratest, Boilerplate, and more',
    href: '/docs/open-source/intro',
    icon: '🔧',
  },
];

const PRODUCT_LINKS = [
  {
    title: 'Pipelines',
    description: 'Deploy infrastructure changes from GitHub/GitLab PRs',
    href: '/docs/terragrunt-scale/pipelines/overview',
  },
  {
    title: 'Patcher',
    description: 'Keep your IaC dependencies up to date automatically',
    href: '/docs/terragrunt-scale/patcher/overview',
  },
  {
    title: 'Account Factory',
    description: 'Stamp out new AWS accounts with best practices',
    href: '/docs/aws-accelerator/account-factory/overview',
  },
  {
    title: 'IaC Library',
    description: '300+ battle-tested OpenTofu/Terraform modules',
    href: '/docs/aws-accelerator/library/overview',
  },
];

function QuickLinkCard({ title, description, href, icon }: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link to={href} className={styles.quickLinkCard}>
      <span className={styles.quickLinkIcon}>{icon}</span>
      <div>
        <Heading as="h3" className={styles.quickLinkTitle}>{title}</Heading>
        <p className={styles.quickLinkDescription}>{description}</p>
      </div>
      <span className={styles.quickLinkArrow}>→</span>
    </Link>
  );
}

function ProductLink({ title, description, href }: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link to={href} className={styles.productLink}>
      <span className={styles.productLinkTitle}>{title}</span>
      <span className={styles.productLinkDescription}>{description}</span>
      <span className={styles.productLinkArrow}>→</span>
    </Link>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroBackground} />
      <div className={styles.heroContent}>
        <p className={styles.heroSubtitle}>Documentation</p>
        <Heading as="h1" className={styles.heroTitle}>
          Build, deploy, and manage infrastructure at scale
        </Heading>
        <p className={styles.heroDescription}>
          Comprehensive guides and API references for Gruntwork's IaC platform, 
          including Pipelines, Patcher, Account Factory, and our open source tools.
        </p>
        <div className={styles.heroCTA}>
          <Link to="/docs/intro" className={styles.primaryButton}>
            Get Started
          </Link>
          <Link to="https://www.gruntwork.io" className={styles.secondaryButton}>
            Learn about Gruntwork
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickLinksSection() {
  return (
    <section className={styles.quickLinksSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>Quick Links</Heading>
        <div className={styles.quickLinksGrid}>
          {QUICK_LINKS.map((link) => (
            <QuickLinkCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className={styles.productsSection}>
      <div className={styles.container}>
        <div className={styles.productsHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Products</Heading>
          <p className={styles.sectionDescription}>
            Explore documentation for each component of the Gruntwork platform
          </p>
        </div>
        <div className={styles.productsGrid}>
          {PRODUCT_LINKS.map((link) => (
            <ProductLink key={link.title} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className={styles.resourcesSection}>
      <div className={styles.container}>
        <Heading as="h2" className={styles.sectionTitle}>Resources</Heading>
        <div className={styles.resourcesGrid}>
          <Link to="/docs/support" className={styles.resourceCard}>
            <Heading as="h3">Support</Heading>
            <p>Get help from our team of DevOps experts</p>
          </Link>
          <Link to="/docs/release-notes" className={styles.resourceCard}>
            <Heading as="h3">Release Notes</Heading>
            <p>Stay up to date with the latest changes</p>
          </Link>
          <Link to="https://library.gruntwork.io" className={styles.resourceCard}>
            <Heading as="h3">Library Search</Heading>
            <p>Search our IaC module library</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Comprehensive documentation for Gruntwork's Infrastructure as Code platform">
      <HomepageHeader />
      <main>
        <QuickLinksSection />
        <ProductsSection />
        <ResourcesSection />
      </main>
    </Layout>
  );
}
