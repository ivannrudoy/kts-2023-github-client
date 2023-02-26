import * as React from "react";

import classNames from "classnames";
import { Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={classNames(styles["app"])}>
      <Routes></Routes>
    </div>
  );
}

export default App;
