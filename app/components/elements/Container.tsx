import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 80%;

  @media screen and (max-width: ${MD}px) {
    max-width: 90%;
  }
`
