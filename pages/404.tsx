import { Button } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px;

  h1 {
    color: ${({ theme }) => theme.palette.primary.main};
    text-shadow: 5px 5px 30px rgba(255, 8, 102, 0.5);
    font-size: 2.5rem;
    text-align: center;

    @media screen and (max-width: ${MD}px) {
      font-size: 2rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const NotFound = () => {
  const { t } = useTranslation('common')
  const { back } = useRouter()

  return (
    <Wrapper>
      <div>
        <h1>
          404
          <br />
          No Party Here
        </h1>

        <Button
          startIcon={<KeyboardArrowLeft />}
          color='primary'
          variant='outlined'
          size='large'
          onClick={back}
        >
          {t('back')}
        </Button>
      </div>
    </Wrapper>
  )
}

export default NotFound
