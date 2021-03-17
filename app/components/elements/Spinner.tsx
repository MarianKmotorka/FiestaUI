import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

interface IStyledProps {
  fontSize?: string
  themed?: 0 | 1
}

const StyledSpinner = styled(FontAwesomeIcon)<IStyledProps>`
  font-size: ${({ fontSize }) => fontSize || '1.4rem'};
  color: ${({ themed, theme }) =>
    themed === 1 ? theme.themeText.themeBlack : theme.themeText.black};
`

interface ISpinnerProps {
  fontSize?: string
  className?: string
  themed?: boolean
}

const Spinner = ({ themed, ...rest }: ISpinnerProps) => (
  <StyledSpinner {...rest} spin icon={faCompactDisc} themed={themed ? 1 : 0} />
)

export default Spinner
