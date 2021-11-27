import "../styles/bootstrap-custom.scss";
import type { AppProps } from "next/app";
import "../styles/font.css";
import { Provider } from "react-redux";
import { store } from "../provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
