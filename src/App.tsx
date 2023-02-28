import * as React from "react";

import Repositories from "@pages/Repositories";
import { Endpoints } from "@utils/Endpoints";
import classNames from "classnames";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={classNames(styles["app"])}>
      <Routes>
        <Route path={Endpoints.ROOT} element={<Repositories />} />
        <Route index element={<Repositories />} />
      </Routes>
    </div>
  );
}

export default App;
