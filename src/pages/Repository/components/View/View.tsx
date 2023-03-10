import * as React from "react";
import { HTMLAttributes } from "react";

import { RepositoryModel } from "@store/models/Github";

type ViewProps = {
  org: string;
  name: string;
  repository: RepositoryModel;
} & HTMLAttributes<HTMLDivElement>;

const View: React.FC<ViewProps> = ({ org, name, repository }) => {
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
            <span>{`${topic} `}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default View;
export type { ViewProps };
