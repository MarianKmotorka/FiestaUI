import { FC } from 'react'
import styled, { keyframes } from 'styled-components'
import Router from 'next/router'
import { useAuth } from '@contextProviders/AuthProvider'
import FiestaLogo from '@elements/FiestaLogo'
import Head from 'next/head'

const Overlay = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`
const logoMotion = keyframes`
  from{
    transform: scale(0.85);
  }
  to{
    transform:scale(1.15)
  }
`

const StyledLogo = styled(FiestaLogo)`
  animation: ${logoMotion} 0.8s linear infinite alternate;
`

const AuthorizedPage: FC = ({ children }) => {
  const auth = useAuth()

  const header = (
    <Head>
      <title>Authorization check | Fiesta</title>
    </Head>
  )

  if (auth.isLoading && !auth.isLoggedIn)
    return (
      <Overlay>
        {header}
        <StyledLogo />
      </Overlay>
    )

  if (!auth.isLoggedIn) {
    Router.replace(`/login?redirectedFrom=${Router.asPath}`)
    return (
      <Overlay>
        {header}

        <StyledLogo />
      </Overlay>
    )
  }

  return (
    <>
      {header}
      {children}
    </>
  )
}

export default AuthorizedPage
