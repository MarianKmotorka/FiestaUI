import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from '@modules/Navbar/Navbar'
import { Container } from '../elements/Container'

import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

interface IDefaultLayoutProps {
  title: string
  forceUnauthorizedNavbar?: true
}

const StyledContainer = styled(Container)`
  margin-top: ${NAVBAR_HEIGHT}px;
`

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children, title, forceUnauthorizedNavbar }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar forceUnauthorizedNavbar={forceUnauthorizedNavbar} />

      <StyledContainer>{children}</StyledContainer>
    </>
  )
}

export default DefaultLayout
