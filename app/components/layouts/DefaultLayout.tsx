import { FC } from 'react'
import styled from 'styled-components'

import { Container } from '../elements/Container'
import FullWidthLayout, { IFullWidthLayoutProps } from './FullWidthLayout'
import { NAVBAR_HEIGHT } from '@modules/Navbar/Navbar.styled'

interface IDefaultLayoutProps extends IFullWidthLayoutProps {}

const StyledContainer = styled(Container)`
  margin-top: ${NAVBAR_HEIGHT}px;
`

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children, title, forceUnauthorizedNavbar }) => {
  return (
    <FullWidthLayout title={title} forceUnauthorizedNavbar={forceUnauthorizedNavbar}>
      <StyledContainer>{children}</StyledContainer>
    </FullWidthLayout>
  )
}

export default DefaultLayout
