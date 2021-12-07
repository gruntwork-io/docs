/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  image?: string;
  docId?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Set Up Your Accounts',
    docId: '/docs/guides/build-it-yourself/landing-zone',
    description: (
      <>
        Streamline how you create, configure, and secure AWS accounts and multi-account structures.
      </>
    ),
  },
  {
    title: 'Configure a CI/CD Pipeline',
    docId: '/docs/guides/build-it-yourself/pipelines',
    description: (
      <>
        Use your preferred CI tool to set up an end‑to‑end pipeline for your infrastructure code.
      </>
    ),
  },
  {
    title: 'Achieve Compliance',
    docId: '/docs/guides/build-it-yourself/compliance',
    description: (
      <>
        Implement the CIS AWS Foundations Benchmark using our curated collection of modules and services.
      </>
    ),
  },
  {
    title: 'The Reference Architecture',
    docId: '/docs/guides/reference-architecture/overview/overview',
    description: (
      <>
        Bootstrap your infrastructure in about a day by letting Gruntwork deploy one customized just for you.
      </>
    ),
  },
  {
    title: 'Deploy a Service',
    docId: '/docs/guides/build-it-yourself/overview',
    description: (
      <>
        Learn how to deploy Gruntwork services to construct your own bespoke architecture.
      </>
    ),
  },
  {
    title: 'Courses',
    docId: '/courses',
    description: (
      <>
        Learn DevOps fundamentals with our series of introductory video tutorials.
      </>
    ),
  },
];

function Feature({title, image, description, docId}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      { image && (
        <div className="text--center">
          <img className={styles.featureSvg} alt={title} src={image} />
        </div>
      )}
      <div className="padding-horiz--lg padding-vert--lg">
        {docId ? (
          <h3><a href={docId}>{title}</a></h3>
        ) : (
          <h3>{title}</h3>)
        }
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
