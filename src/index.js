import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { ClientProvider } from "./contextProviders/clientContext";

ReactDOM.render(
  <ClientProvider>
    <App />
  </ClientProvider>,

  document.getElementById("root")
);

serviceWorker.unregister();
