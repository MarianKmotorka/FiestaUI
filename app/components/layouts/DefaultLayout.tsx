import Navbar from '@modules/Navbar/Navbar'
import { FC } from 'react'

interface IDefaultLayoutProps {}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default DefaultLayout
