import React from "react";
import "../styles/globals.css";
import "../styles/font.css";

import type { AppProps } from "next/app";

import { Provider } from "react-redux"; // react 앱에 redux store를 제공해줌
import { store } from "../provider"; // redux store
import { WrappedBuildError } from "next/dist/server/next-server";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

/*
function MyApp({ Component, pageProps }: AppProps) {
  return;
  //<Component {...pageProps} />;
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>;
}
*/

export default MyApp;
