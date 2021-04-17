import { FC } from 'react'
import Head from 'next/head'
import Navbar from '@modules/Navbar/Navbar'
import styled from 'styled-components'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

export interface IFullWidthLayoutProps {
  title: string
  forceUnauthorizedNavbar?: true
}

const MarginTop = styled.div`
  margin-top: ${NAVBAR_HEIGHT}px;
`

const FullWidthLayout: FC<IFullWidthLayoutProps> = ({
  children,
  title,
  forceUnauthorizedNavbar
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar forceUnauthorizedNavbar={forceUnauthorizedNavbar} />
      <MarginTop>{children}</MarginTop>
    </>
  )
}

export default FullWidthLayout
