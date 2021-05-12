import { Children, cloneElement, isValidElement, PropsWithChildren, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface IProps extends PropsWithChildren<LinkProps> {
  activeClassName?: string
}

const NavLink = ({ href, children, activeClassName, ...rest }: IProps) => {
  const { asPath } = useRouter()
  const isActive = asPath.includes(href.toString())

  const addActiveClass = (node: ReactNode): ReactNode =>
    Children.map(node, x => {
      if (isValidElement(x))
        return cloneElement(x, { ...x.props, className: activeClassName || 'active' })
    })?.[0]

  return (
    <Link {...rest} href={href}>
      {isActive ? addActiveClass(children) : children}
    </Link>
  )
}

export default NavLink
