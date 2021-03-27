import styled from 'styled-components'

export const Wrapper = styled.div`
  h3 {
    color: ${({ theme }) => theme.error.main};
    font-size: 1.5rem;
  }
`
