import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 60%;
    width: 60%;
    margin: 50px 0 50px 0;
  }
  h1 {
    color: ${({ theme }) => theme.palette.themeText.themeBlack};
  }
  p {
    font-weight: 500;
    margin: 0;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
  }
`

const NothingFound = () => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <img src='/NothingFound.svg'></img>
      <h1>{t('nothingFound')}...</h1>
      <p>{t('areYouSureYouWereLookingForThis')}</p>
    </Wrapper>
  )
}

export default NothingFound
