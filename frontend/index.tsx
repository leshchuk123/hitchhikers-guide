import * as React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./src/App";

import "./src/styles/common.scss";

const container = document.getElementById('root');
// createRoot(container!) if you use TypeScript
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
