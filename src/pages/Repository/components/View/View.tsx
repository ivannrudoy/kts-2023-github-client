import * as React from "react";
import { HTMLAttributes } from "react";

import { RepositoryModel } from "@store/models/Github";

type ViewProps = {
  org: string;
  name: string;
  repository: RepositoryModel;
  readme: string;
} & HTMLAttributes<HTMLDivElement>;

const View: React.FC<ViewProps> = ({ org, name, repository, readme }) => {
  return (
    <div>
      <div>
        <div>Back</div>
        {org}/{name}
      </div>
      <div>
        <a href={repository.org_url}>{org}</a>
      </div>
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
      <div dangerouslySetInnerHTML={{ __html: readme }} />
    </div>
  );
};

export default View;
export type { ViewProps };
