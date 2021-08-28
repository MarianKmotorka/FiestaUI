import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'
import Button from '@elements/Button/Button'
import { Container } from '@elements/Container'
import useWindowSize from '@hooks/useWindowSize'
import FullWidthLayout from '@layouts/FullWidthLayout'
import { Fab } from '@material-ui/core'
import { ChevronRight, EventAvailable } from '@material-ui/icons'
import { Blob, Layer1, Section, Wrapper } from './LandingPage.styled'

const ThemeBtn = () => {
  const { switchTheme } = useAppTheme()
  return (
    <div
      style={{
        position: 'fixed',
        left: '20px',
        top: '20px',
        zIndex: 99999
      }}
    >
      <Fab
        color='primary'
        onClick={switchTheme}
        style={{
          background: 'transparent',
          boxShadow: 'none'
        }}
      >
        {' '}
      </Fab>
    </div>
  )
}

const LandingPage = () => {
  const { minLarge } = useWindowSize()
  return (
    <Wrapper>
      <FullWidthLayout transparentNavbar forceUnauthorizedNavbar title='Fiesta'>
        <ThemeBtn />

        <Section
          center
          height={minLarge ? '70vh' : '85vh'}
          style={{ paddingTop: minLarge ? '100px' : '50px' }}
        >
          <Container>
            <h1>
              Number #1 Platform
              <br /> For Event Management
            </h1>

            <h3>BETA version</h3>

            <Button endIcon={<ChevronRight />} id='get-started-btn' href='/login'>
              Get started
            </Button>

            <Blob>
              <EventAvailable />
            </Blob>
          </Container>
        </Section>

        <Layer1 />
      </FullWidthLayout>
    </Wrapper>
  )
}

export default LandingPage
