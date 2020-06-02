module.exports = {
  title: 'earl',
  tagline: 'Ergonomic, modern and type-safe assertion library for TypeScript',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'krzkaczor', // Usually your GitHub org/user name.
  projectName: 'earl', // Usually your repo name.
  themeConfig: {
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
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
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/krzkaczor/earl/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
