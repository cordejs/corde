module.exports = {
  title: "Corde",
  tagline: "A simple library for Discord bot tests",
  url: "https://github.com/lucasgmagalhaes/corde",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "lucasgmagalhaes",
  projectName: "Corde",
  themeConfig: {
    navbar: {
      title: "Corde",
      logo: {
        alt: "corde logo",
        src: "img/logo.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://github.com/lucasgmagalhaes/corde",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/corde",
            },
          ],
        },
      ],
      copyright: `Corde ${new Date().getFullYear()} `,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/lucasgmagalhaes/corde",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
