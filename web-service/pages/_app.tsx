import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import Script from 'next/script'
import { isProduction } from '../utils/common'

const isProd = isProduction()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      { isProd && process.env.ANALYTICS_URL ? (<>
        <Script id="goat-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.goatcounter = {no_onload: true}
window.addEventListener('hashchange', function(e) {
window.goatcounter.count({
path: location.pathname + location.search + location.hash,
})
});
`,}}
        />
        <script data-goatcounter={process.env.ANALYTICS_URL}
          async src={`//${process.env.ANALYTICS_URL}/count.js`}></script>
      </>) : null }

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
