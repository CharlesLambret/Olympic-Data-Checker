import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./app/Layout.tsx";
import { Provider } from "react-redux";
import { store } from "./app/redux/store/store.ts";
import { Toaster } from "./components/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
