import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const imgUrl = useBaseUrl("img/logo/logo.png");
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <header className={styles.heroBanner}>
        <div className="container">
          <img className={styles.featureImage} src={imgUrl} alt={siteConfig.title} />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.npmDownloadContainer}>
            <span>npm i corde</span>
          </div>
        </div>
      </header>
    </Layout>
  );
}

export default Home;
