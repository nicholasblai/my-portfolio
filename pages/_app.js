import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { useRouter } from 'next/router'

import '../styles/main.css'

const DEFAULT_SITE_URL = 'https://my-portfolio-eight-xi-43.vercel.app'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

export default function Nextra({ Component, pageProps }) {
  const router = useRouter()
  const pagePath = router.asPath.split('?')[0].split('#')[0]
  const canonicalUrl = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
