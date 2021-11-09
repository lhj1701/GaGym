import React from "react";
import "../styles/globals.css";
import "../styles/font.css";

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { store } from "../provider";
import { WrappedBuildError } from "next/dist/server/next-server";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
