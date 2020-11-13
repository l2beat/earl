import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Head from '@docusaurus/Head';

import styles from './styles.module.css'

const features = [
  {
    title: <>Powerful</>,
    emoji: '💪',
    description: <>Use advanced assertions that are able to match whole ranges of values.</>,
  },
  {
    title: <>Type-safe</>,
    emoji: '🤖',
    description: <>Written in TypeScript with type-safety in mind.</>,
  },
  {
    title: <>Mocks</>,
    emoji: '🎭',
    description: <>Type-safe, fully integrated mocks included!</>,
  },
  {
    title: <>Works great with Mocha</>,
    emoji: '☕',
    description: <>Finally a modern assertion library for Mocha.</>,
  },
]

function Feature({ emoji, title, description }) {
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <div className="text--center">
        <span className={styles.featureEmoji}>{emoji}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`earl - assertion library for TypeScript`}
      description="Ergonomic, modern and type-safe assertion library for TypeScript"
    >
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <img src="/img/gh-cover.png" />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames('button button--outline button--secondary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className={classnames('main--primary')}>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Home
