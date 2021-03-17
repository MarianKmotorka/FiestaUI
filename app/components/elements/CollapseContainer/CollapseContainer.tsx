import { useEffect, useRef, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import useWindowSize from '@hooks/useWindowSize'
import { StyledCollapse, StyledButton } from './CollapseContainer.styled'

interface ICollapseContainerProps {
  collapsedHeight?: number
  children: JSX.Element
}

const CollapseContainer = ({ collapsedHeight = 40, children }: ICollapseContainerProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const [showMoreButton, setShowMoreButton] = useState(true)
  const innerRef = useRef<HTMLDivElement>(null!)
  const { width } = useWindowSize()
  const { t } = useTranslation('common')

  useEffect(() => {
    if (innerRef?.current)
      setShowMoreButton(innerRef.current.getBoundingClientRect().height > collapsedHeight)
  }, [innerRef, width, collapsedHeight])

  return (
    <div>
      <StyledCollapse in={!collapsed} collapsedHeight={collapsedHeight}>
        <div ref={innerRef}>{children}</div>
      </StyledCollapse>

      {showMoreButton && (
        <StyledButton onClick={() => setCollapsed(x => !x)}>
          {t('showMore').toUpperCase()}
        </StyledButton>
      )}
    </div>
  )
}

export default CollapseContainer
