import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import useWindowSize from '@hooks/useWindowSize'
import { StyledCollapse, StyledButton } from './CollapseContainer.styled'

interface ICollapseContainerProps {
  collapsedHeight?: number
  children: JSX.Element
}

const CollapseContainer = ({ collapsedHeight = 60, children }: ICollapseContainerProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const { t } = useTranslation('common')

  // Note: Makes sure "showMoreButton" is displayed properly when window is resized
  useWindowSize()

  const buttonText = collapsed ? 'showMore' : 'showLess'

  const handleShowButton = (el: HTMLDivElement | null) => {
    if (el) setShowMoreButton(el.getBoundingClientRect().height > collapsedHeight)
  }

  return (
    <div>
      <StyledCollapse in={!collapsed} collapsedHeight={collapsedHeight}>
        <div ref={handleShowButton}>{children}</div>
      </StyledCollapse>

      {showMoreButton && (
        <StyledButton onClick={() => setCollapsed(x => !x)}>
          {t(buttonText).toUpperCase()}
        </StyledButton>
      )}
    </div>
  )
}

export default CollapseContainer
