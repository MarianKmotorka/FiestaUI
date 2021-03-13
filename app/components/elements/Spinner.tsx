import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledSpinner = styled(FontAwesomeIcon)<ISpinnerProps>`
  font-size: ${({ fontSize }) => fontSize || '1.4rem'};
`

interface ISpinnerProps {
  fontSize?: string
  className?: string
}

const Spinner = ({ fontSize, className }: ISpinnerProps) => (
  <StyledSpinner spin icon={faCompactDisc} fontSize={fontSize} className={className} />
)

export default Spinner
