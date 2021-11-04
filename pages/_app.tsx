import '../styles/bootstrap-custom.scss'
import type { AppProps } from 'next/app'
import '../styles/font.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
