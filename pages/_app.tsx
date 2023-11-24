// _app.tsx
import '../app/globals.css';
import Header from './Header';
import Footer from './Footer';
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp;