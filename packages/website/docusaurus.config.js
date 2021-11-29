// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Earl',
  tagline: 'Ergonomic, modern and type-safe assertion library for TypeScript',
  url: 'https://earljs.dev/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'earljs', // Usually your GitHub org/user name.
  projectName: 'earl', // Usually your repo name.
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: '/img/social.png',
    navbar: {
      title: 'earl',
      logo: {
        alt: 'earl',
        src: 'img/logo.svg',
        height: '32px',
        width: '32px',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/earl-js/earl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: 'docs/introduction/getting-started',
            },
            {
              label: 'API Reference',
              to: 'docs/api/api-reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/krzkaczor',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/earl-js/earl',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} dΞth`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/earl-js/earl/edit/master/website/',
          sidebarCollapsible: false,
          remarkPlugins: [require('./src/remark/code-heading-highlighter')],
        },
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}

module.exports = config
