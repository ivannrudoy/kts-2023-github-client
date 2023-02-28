import * as React from "react";
import { HTMLAttributes, memo } from "react";

type RepositoriesProps = {} & HTMLAttributes<HTMLDivElement>;

const Repositories: React.FC<RepositoriesProps> = () => <></>;

export type { RepositoriesProps };
export default memo(Repositories);
