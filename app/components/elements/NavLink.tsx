import { Children, cloneElement, isValidElement, PropsWithChildren, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ href, children, ...rest }: PropsWithChildren<LinkProps>) => {
  const { pathname } = useRouter()

  const isActive = href.toString().includes(pathname) && pathname !== '/'

  const addActiveClass = (node: ReactNode): ReactNode =>
    Children.map(node, x => {
      if (isValidElement(x)) return cloneElement(x, { ...x.props, className: 'active' })
    })?.[0]

  return (
    <Link {...rest} href={href}>
      {isActive ? addActiveClass(children) : children}
    </Link>
  )
}

export default NavLink
