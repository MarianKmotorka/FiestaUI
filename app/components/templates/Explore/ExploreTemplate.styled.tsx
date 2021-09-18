import styled from 'styled-components'

export const Wrapper = styled.div`
  padding-bottom: 50px;
`

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-items: center;
`

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 50px;

  hr {
    height: 30px;
  }
`
