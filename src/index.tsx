import * as React from "react";

import * as ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

import "regenerator-runtime";

const rootId = "root";
const container = document.getElementById(rootId) as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  // @NOTE: Remounts the components twice on load, useeffects runs x2 in strict mode!
  // @NOTE: Remove on production
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
