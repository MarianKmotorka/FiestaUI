import { FC } from 'react'

import { Container } from '../elements/Container'
import FullWidthLayout, { IFullWidthLayoutProps } from './FullWidthLayout'

interface IDefaultLayoutProps extends IFullWidthLayoutProps {}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children, title, forceUnauthorizedNavbar }) => {
  return (
    <FullWidthLayout title={title} forceUnauthorizedNavbar={forceUnauthorizedNavbar}>
      <Container>{children}</Container>
    </FullWidthLayout>
  )
}

export default DefaultLayout
