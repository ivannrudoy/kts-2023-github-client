import * as React from "react";
import { HTMLAttributes } from "react";

import Link from "@assets/link.svg";
import { RepositoryModel } from "@store/models/Github";
import { useNavigate } from "react-router-dom";

import styles from "./View.module.scss";

type ViewProps = {
  org: string;
  name: string;
  repository: RepositoryModel;
  readme: string;
} & HTMLAttributes<HTMLDivElement>;

const View: React.FC<ViewProps> = ({ org, name, repository, readme }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav__bar}>
          <div onClick={handleBack} className={styles.nav__back}></div>
          <h1 className={styles.nav__title}>
            {org}/{name}
          </h1>
        </nav>
      </header>
      <main>
        <section className={styles.org}>
          <img src={Link} alt="" />
          <a className={styles.org__link} href={repository.org_url}>
            {org}
          </a>
        </section>
        <section>
          {repository.topics.length > 0 && (
            <div>
              {repository.topics.map((topic) => (
                <span key={topic}>{`${topic} `}</span>
              ))}
            </div>
          )}
          <div>{repository.stargazers_count}</div>
          <div>{repository.watchers}</div>
          <div>{repository.forks}</div>
        </section>
        <section>
          <article dangerouslySetInnerHTML={{ __html: readme }} />
        </section>
      </main>
    </>
  );
};

export default View;
export type { ViewProps };
