import { useState } from 'react'
import { Fab } from '@material-ui/core'
import useObserver from '@hooks/useObserver'
import { ChevronRight, EventAvailable, Warning } from '@material-ui/icons'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

import Button from '@elements/Button/Button'
import { Container } from '@elements/Container'
import useWindowSize from '@hooks/useWindowSize'
import FullWidthLayout from '@layouts/FullWidthLayout'
import { useAppTheme } from '@contextProviders/AppThemeProvider/AppThemeProvider'

import {
  Blob,
  Footer,
  Layer1,
  Layer2,
  Section,
  Step,
  StepContainer,
  StepLine,
  Wrapper
} from './LandingPage.styled'

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
  const { isDark } = useAppTheme()
  const [inViewStepIndexes, setInViewStepIndexes] = useState<number[]>([])
  const firstStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 0]))
  const secondStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 1]))
  const thirdStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 2]))
  const fourthStepRef = useObserver<HTMLDivElement>(() => setInViewStepIndexes(x => [...x, 3]))
  const { text } = useTypewriter({
    words: ['Event Management', 'Discovering Events', 'Getting Social'],
    loop: true
  })

  return (
    <Wrapper>
      <FullWidthLayout transparentNavbar forceUnauthorizedNavbar title='Fiesta'>
        <ThemeBtn />

        <Section
          center
          height={minLarge ? '60vh' : '85vh'}
          style={{ paddingTop: minLarge ? '100px' : '50px' }}
        >
          <Container>
            <h1>
              Number #1 Platform
              <br />
              For <span>{text}</span>
              <Cursor />
            </h1>

            <h3>ALPHA - still under development</h3>

            <Button endIcon={<ChevronRight />} id='get-started-btn' href='/signup'>
              Get started
            </Button>

            <Blob>
              <EventAvailable />
            </Blob>
          </Container>
        </Section>

        <Layer1 />
        <Layer2 />

        <Container>
          <StepContainer inView={inViewStepIndexes.includes(0)} ref={firstStepRef}>
            <StepLine position='first' />
            <Step className='step'>
              <h1>Create Event</h1>
              <img src={isDark ? 'createEventScreenshot-dark.png' : 'createEventScreenshot.png'} />
            </Step>
          </StepContainer>

          <StepContainer inView={inViewStepIndexes.includes(1)} ref={secondStepRef}>
            <StepLine />
            <Step className='step'>
              <h1>Upload Your Banner</h1>
              <img src={isDark ? 'eventDetailScreenshot-dark.png' : 'eventDetailScreenshot.png'} />
            </Step>
          </StepContainer>

          <StepContainer inView={inViewStepIndexes.includes(2)} ref={thirdStepRef}>
            <StepLine />
            <Step className='step'>
              <h1>Invite People</h1>

              <img src={isDark ? 'inviteScreenshot-dark.png' : 'inviteScreenshot.png'} />
            </Step>
          </StepContainer>

          <StepContainer inView={inViewStepIndexes.includes(3)} ref={fourthStepRef}>
            <StepLine position='last' />
            <Step className='step'>
              <h1>Discuss About Event</h1>

              <img src={isDark ? 'commentsScreenshot-dark.png' : 'commentsScreenshot.png'} />
            </Step>
          </StepContainer>
        </Container>

        <Footer>
          <Container>
            <h1>
              <Warning /> Under construction
              <Warning />
            </h1>
          </Container>
        </Footer>
      </FullWidthLayout>
    </Wrapper>
  )
}

export default LandingPage
