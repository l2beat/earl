module.exports = {
  title: 'Earl',
  tagline: 'Ergonomic, modern and type-safe assertion library for TypeScript',
  url: 'https://earl.netlify.app/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'krzkaczor', // Usually your GitHub org/user name.
  projectName: 'earl', // Usually your repo name.
  themeConfig: {
    image: '/img/social.png',
    disableDarkMode: true,
    sidebarCollapsible: false,
    navbar: {
      title: 'earl',
      logo: {
        alt: 'earl',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/krzkaczor/earl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
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
              href: 'https://github.com/krzkaczor/earl',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kris Kaczor`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          path: '../docs',
          homePageId: 'introduction/getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/krzkaczor/earl/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
