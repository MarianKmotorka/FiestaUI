import styled from 'styled-components'
import { SM } from 'utils/theme'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 300px;
  width: 100%;

  > * + * {
    margin-top: 30px;
  }

  @media screen and (max-width: ${SM}px) {
    padding: 50px 30px;
  }
`
