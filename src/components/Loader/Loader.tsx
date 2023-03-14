import classNames from "classnames";
import React, { FC, HTMLAttributes, } from "react";

import styles from "./Loader.module.scss";

enum Size {
    s = "s",
    m = "m",
    l = "l"
}

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
    size?: Size;
};

const Loader: FC<LoaderProps> = ({ size = Size.l }) => {
    return <div className={classNames(styles.loader, styles[`loader_size_${size}`])}></div>
}

export default Loader;
export type { LoaderProps };
export { Size };