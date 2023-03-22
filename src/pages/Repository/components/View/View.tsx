import * as React from "react";
import { HTMLAttributes } from "react";

import Eye from "@assets/eye.svg";
import Fork from "@assets/fork.svg";
import Link from "@assets/link.svg";
import Star from "@assets/star.svg";
import Loader from "@components/Loader";
import { RepositoryModel } from "@store/models/Github";
import RepositoryStore from "@store/RepositoryStore";
import { ResponseState } from "@utils/ResponseState";
import { useNavigate } from "react-router-dom";

import styles from "./View.module.scss";

type ViewProps = {
  org: string;
  name: string;
  repository: RepositoryModel;
  repositoryState: ResponseState;
  readme: string;
  readmeState: ResponseState;
} & HTMLAttributes<HTMLDivElement>;

const View: React.FC<ViewProps> = ({
  org,
  name,
  repository,
  readme,
  repositoryState,
  readmeState,
}) => {
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
        {repositoryState === ResponseState.LOADING ? (
          <Loader />
        ) : (
          <>
            <section>
              <div className={styles.org}>
                <img src={Link} alt="" />
                <a className={styles.org__link} href={repository.org_url}>
                  {org}
                </a>
              </div>
              {repository.topics.length > 0 && (
                <div className={styles.topics}>
                  {repository.topics.map((topic) => (
                    <span
                      className={styles.topics__item}
                      key={topic}
                    >{`${topic} `}</span>
                  ))}
                </div>
              )}
              <div>
                <div className={styles.stars}>
                  <img className={styles.stars__star} src={Star} alt="" />
                  <span className={styles.stars__count}>
                    {`${repository.stargazers_count} `}
                  </span>{" "}
                  &nbsp;stars
                </div>
                <div className={styles.watchers}>
                  <img className={styles.watchers__icon} src={Eye} alt="" />
                  <span className={styles.watchers__count}>
                    {`${repository.watchers} `}
                  </span>{" "}
                  &nbsp;watching
                </div>
                <div className={styles.forks}>
                  <img className={styles.forks__icon} src={Fork} alt="" />
                  <span className={styles.forks__count}>
                    {`${repository.forks} `}
                  </span>{" "}
                  &nbsp;fork
                </div>
              </div>
            </section>
          </>
        )}
        {readmeState === ResponseState.ERROR_NOT_FOUND ? (
          <>No readme</>
        ) : (
          <section className={styles.readme}>
            {readmeState !== ResponseState.SUCCESS ? (
              <Loader />
            ) : (
              <>
                <h2 className={styles.readme__title}>README.md</h2>
                <article dangerouslySetInnerHTML={{ __html: readme }} />
              </>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default View;
export type { ViewProps };
