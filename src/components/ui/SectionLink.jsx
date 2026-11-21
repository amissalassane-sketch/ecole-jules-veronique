import { Link, useLocation } from 'react-router-dom'

/**
 * SectionLink — link to a home-page section (`hash` = '#school', …) that works
 * from every route. On the home page it stays a plain anchor (native smooth
 * scroll); elsewhere it navigates through the router, so the deploy base path
 * is kept and <ScrollToTop /> scrolls to the section once the home page mounts.
 */
export default function SectionLink({ hash, children, ...props }) {
  const { pathname } = useLocation()
  if (pathname === '/') {
    return <a href={hash} {...props}>{children}</a>
  }
  return <Link to={{ pathname: '/', hash }} {...props}>{children}</Link>
}
