const YEAR = new Date().getFullYear()

const navs = [
  { url: '/', name: 'Home' },
  { url: '/about', name: 'About' },
  { url: '/projects', name: 'Projects' },
  { url: '/photos', name: 'Photos' }
]

export default {
  navs,
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © Nicholas Lai
      <a href="/feed.xml">RSS</a>
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
