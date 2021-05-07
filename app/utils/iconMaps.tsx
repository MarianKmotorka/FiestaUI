import { ReactNode } from 'react'
import { Group, Lock, Public } from '@material-ui/icons'
import { AccessibilityTypeEnum } from 'domainTypes'

export const accessibilityTypeIconMap: Record<AccessibilityTypeEnum, ReactNode> = {
  [AccessibilityTypeEnum.Public]: <Public />,
  [AccessibilityTypeEnum.Private]: <Lock />,
  [AccessibilityTypeEnum.FriendsOnly]: <Group />
}
