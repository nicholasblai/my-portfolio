import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import '../styles/main.css'

const DEFAULT_SITE_URL = 'https://nicholasblai.vercel.app'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/photos', label: 'Photos' }
]

const isActiveRoute = (href, asPath) => {
  const pagePath = asPath.split('?')[0].split('#')[0]

  if (href === '/') {
    return pagePath === '/'
  }

  return pagePath === href || pagePath.startsWith(`${href}/`)
}

export default function Nextra({ Component, pageProps }) {
  const router = useRouter()
  const pagePath = router.asPath.split('?')[0].split('#')[0]
  const canonicalUrl = `${SITE_URL}${pagePath === '/' ? '' : pagePath}`
  const topLevelPageTitle =
    NAV_ITEMS.find(({ href }) => href === pagePath)?.label || null

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
      <div className="site-nav-wrap">
        {topLevelPageTitle && (
          <div className="site-nav-title">{topLevelPageTitle}</div>
        )}
        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = isActiveRoute(href, router.asPath)

            return active ? (
              <span key={href} className="site-nav-item site-nav-item-active">
                {label}
              </span>
            ) : (
              <Link key={href} href={href} className="site-nav-item">
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className={topLevelPageTitle ? 'page-content-with-nav-title' : ''}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
