import * as React from "react";

import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "regenerator-runtime";
import "@config/configureMobX";
import App from "./App";

const rootId = "root";
const container = document.getElementById(rootId) as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
