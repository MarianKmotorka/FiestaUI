import { CardContent } from '@material-ui/core'
import styled from 'styled-components'
import { SM } from 'utils/theme'

export const FormContent = styled(CardContent)`
  display: flex;
  margin: 50px;
  flex-direction: column;

  > * + * {
    margin-top: 30px;
  }

  input {
    width: 300px;
  }

  @media screen and (max-width: ${SM}px) {
    margin: 17px;
    input {
      width: 240px;
    }
  }
`

export const Error = styled.div`
  padding: 13px;
  background-color: ${({ theme }) => theme.error.main};
  color: ${({ theme }) => theme.themeText.white};
  text-align: center;
  font-size: 1.1rem;
`
