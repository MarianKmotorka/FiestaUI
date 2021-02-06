import { FC } from 'react'
import styled from 'styled-components'
import Navbar from '@modules/Navbar/Navbar'
import { Container } from '../elements/Container'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

interface IDefaultLayoutProps {}

const StyledContainer = styled(Container)`
  margin-top: ${NAVBAR_HEIGHT}px;
`

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <StyledContainer>{children}</StyledContainer>
    </>
  )
}

export default DefaultLayout
