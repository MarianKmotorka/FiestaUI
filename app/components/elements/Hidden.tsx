import styled from 'styled-components'

interface IHiddenProps {
  hidden: boolean
}

const Hidden = styled.div<IHiddenProps>`
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`

export default Hidden
