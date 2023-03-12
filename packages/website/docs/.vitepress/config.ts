import { defineConfig } from 'vitepress'

const pkg = require('../../../earljs/package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'earl',
  description: 'Modern assertion library for TypeScript.',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'earl' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Modern assertion library for TypeScript.',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://earljs.dev/social.png' },
    ],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: 'earl' }],
    [
      'meta',
      {
        property: 'twitter:description',
        content: 'Modern assertion library for TypeScript.',
      },
    ],
    [
      'meta',
      { property: 'twitter:image', content: 'https://earljs.dev/social.png' },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/l2beat/earl/edit/master/packages/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/l2beat/earl' },
      { icon: 'twitter', link: 'https://twitter.com/l2beat' },
    ],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction/getting-started' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/l2beat/earl/blob/master/packages/earljs/CHANGELOG.md',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/l2beat/earl/blob/master/CONTRIBUTING.md',
          },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} L2BEAT`,
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/introduction/getting-started' },
          {
            text: 'Step by step guide',
            link: '/introduction/step-by-step-guide',
          },
          { text: 'Core concepts', link: '/introduction/core-concepts' },
          { text: 'Motivation', link: '/introduction/motivation' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Using matchers', link: '/guides/using-matchers' },
          { text: 'Testing errors', link: '/guides/testing-errors' },
          { text: 'Async functions', link: '/guides/async-functions' },
          { text: 'Mocks', link: '/guides/mocks' },
          { text: 'Using plugins', link: '/guides/using-plugins' },
          {
            text: 'Test runner integration',
            link: '/guides/test-runner-integration',
          },
          { text: 'Snapshot testing', link: '/guides/snapshot-testing' },
        ],
      },
      {
        text: 'API',
        items: [{ text: 'API Reference', link: '/api/api-reference' }],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Plugin development', link: 'advanced/plugin-development' },
          { text: 'Equality algorithm', link: 'advanced/equality-algorithm' },
        ],
      },
    ],
  },
})
