import { Card } from '@material-ui/core'
import styled from 'styled-components'
import { MD } from 'utils/theme'

export const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  padding: 5px 20px 20px;

  display: flex;
  flex-direction: column;
  min-width: 300px;

  > * + * {
    margin-top: 10px;
  }

  .MuiInputBase-root {
    width: 100%;
    max-width: 300px;
  }
`

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 300;
  color: ${({ theme }) => theme.themeText.themeBlack};
  margin-bottom: 5px;

  @media screen and (max-width: ${MD}px) {
    font-size: 1.5rem;
  }
`
