import { FC } from 'react'
import { Slide, useScrollTrigger } from '@material-ui/core'

const HideOnScroll: FC = ({ children }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children as any}
    </Slide>
  )
}

export default HideOnScroll
