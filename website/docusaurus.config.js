const versions = require("./versions.json");

module.exports = {
  title: "Corde",
  tagline: "A simple library for Discord bot tests",
  url: "https://lucasgmagalhaes.github.io/corde",
  baseUrl: "/",
  onBrokenLinks: "log",
  favicon: "img/logo/favicon.ico",
  organizationName: "lucasgmagalhaes",
  projectName: "corde",
  themeConfig: {
    navbar: {
      title: "Corde",
      logo: {
        alt: "corde logo",
        src: "img/logo/apple-icon-114x114.png",
      },
      items: [
        {
          to: "docs/",
          activeBaseRegex: "^(.*docs\\/(?!(structures\\/?)).*)",
          label: "Docs",
          position: "left",
        },
        {
          to: "docs/structures/",
          activeBasePath: "docs/structures",
          label: "Structures",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: "/versions",
              label: "All versions",
            },
          ],
        },
        {
          href: "https://github.com/lucasgmagalhaes/corde",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
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
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/lucasgmagalhaes/corde/edit/master/docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: "current",
          disableVersioning: false,
          onlyIncludeVersions: ["current", ...versions.slice(1)],
          versions: {
            current: {
              label: versions[0],
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  // plugins: [
  //   [
  //     "@docusaurus/plugin-sitemap",
  //     {
  //       cacheTime: 600 * 1000, // 600 sec - cache purge period
  //       changefreq: "weekly",
  //       priority: 0.5,
  //       trailingSlash: false,
  //     },
  //   ],
  // ],
};
