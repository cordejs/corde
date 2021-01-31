import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useVersions } from "@theme/hooks/useDocs";

export default function Versions() {
  const { siteConfig } = useDocusaurusContext();
  const versions = useVersions();
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;
  return (
    <Layout title="Versions" description="Verions of Corde">
      <main className="container margin-vert--lg">
        <h1>Corde versions</h1>
        <p>
          You can see bellow all releases of corde. Check the repository in Github to a more
          detailed informantion.
        </p>

        {versions.length > 0 && (
          <div className="margin-bottom--lg">
            <table>
              <tbody>
                {versions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>Documentation</Link>
                    </td>
                    <td>
                      <a href={`${repoUrl}/releases/tag/v${version.name}`}>Release Notes</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}
