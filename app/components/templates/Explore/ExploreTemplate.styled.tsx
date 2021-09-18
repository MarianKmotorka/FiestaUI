import styled from 'styled-components'

export const Wrapper = styled.div`
  padding-bottom: 50px;
`

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-items: center;
  margin-top: 40px;
`

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  padding: 10px 0;

  hr {
    height: 30px;
  }

  position: sticky;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 5;
  top: 0px;
`
