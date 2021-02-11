import { Card } from '@material-ui/core'
import styled from 'styled-components'
import { SM } from 'utils/theme'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 500px;
  width: 100%;

  > * + * {
    margin-top: 30px;
  }

  @media screen and (max-width: ${SM}px) {
    width: 280px;
    padding: 10px;
  }
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-bottom: 0;

  > * + * {
    margin-top: 30px;
  }
`
