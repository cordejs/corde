const versions = require("./versions.json");

function getLastVersion() {
  return versions[0];
}

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
        src: "img/logo/logo.png",
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
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            // {
            //   to: "/versions",
            //   label: "All versions",
            // },
          ],
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
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/lucasgmagalhaes/corde/edit/master/website/docs",

          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: undefined,
          disableVersioning: false,
          onlyIncludeVersions: versions,
          versions: {
            current: {
              label: `${getLastVersion()} 🚧`,
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-sitemap",
      {
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        changefreq: "weekly",
        priority: 0.5,
        trailingSlash: false,
      },
    ],
  ],
};
