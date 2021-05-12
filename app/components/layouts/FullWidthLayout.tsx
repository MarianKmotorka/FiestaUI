import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from '@modules/Navbar/Navbar'
import { useAuth } from '@contextProviders/AuthProvider'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'
import BottomNavigation from '@modules/BottomNavigation/BottomNavigation'

import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from '@modules/Navbar/Navbar.styled'
import { BOTTOM_NAVIGATION_HEIGHT } from '@modules/BottomNavigation/BottomNavigation.styled'

export interface IFullWidthLayoutProps {
  title: string
  forceUnauthorizedNavbar?: true
}

const Wrapper = styled.div<{ paddingBottom: number }>`
  padding-top: ${NAVBAR_HEIGHT}px;

  @media screen and (max-width: ${MD}px) {
    padding-bottom: ${({ paddingBottom }) => paddingBottom + 'px'};
  }

  @media screen and (max-width: ${SM}px) {
    padding-top: ${NAVBAR_HEIGHT_MOBILE}px;
  }
`

const FullWidthLayout: FC<IFullWidthLayoutProps> = ({
  children,
  title,
  forceUnauthorizedNavbar
}) => {
  // if this causes rerender performance issues, memoize Wrapper upon children
  const { isLoggedIn } = useAuth()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar forceUnauthorizedNavbar={forceUnauthorizedNavbar} />

      <Wrapper
        paddingBottom={isLoggedIn && !forceUnauthorizedNavbar ? BOTTOM_NAVIGATION_HEIGHT : 0}
      >
        {children}
      </Wrapper>

      {!forceUnauthorizedNavbar && <BottomNavigation />}
    </>
  )
}

export default FullWidthLayout
