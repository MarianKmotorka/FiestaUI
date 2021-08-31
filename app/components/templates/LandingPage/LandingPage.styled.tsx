import styled, { css } from 'styled-components'
import { LG, MD } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div``

const Spacer = styled.div`
  aspect-ratio: 960/300;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const Layer1 = styled(Spacer)`
  background-image: url('wave-overlap.svg');
`
export const Layer2 = styled(Spacer)`
  background-image: url('wave-overlap-reversed.svg');
`

export const Section = styled.section<{ center?: true; height?: string; bg?: string }>`
  position: relative;
  min-height: ${({ height }) => height || '100vh'};
  background: ${({ bg }) => bg};
  ${({ center }) =>
    center &&
    css`
      display: grid;
      place-items: center;
    `}

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
    @media screen and (max-width: 800px) {
      font-size: 3rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 2rem;
      text-align: center;
    }
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    @media screen and (max-width: 800px) {
      font-size: 1.3rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1rem;
      text-align: center;
    }
  }

  #get-started-btn {
    width: 290px;
    height: 60px;
    border-radius: 4px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    font-weight: 500;
    font-size: 1.3rem;
    text-transform: uppercase;
    transition: transform 0.2s;
    svg {
      font-size: 2rem;
    }
    :hover {
      transform: scale(1.1);
    }

    @media screen and (max-width: 800px) {
      font-size: 1rem;
      width: 250px;
      height: 50px;
    }
    @media screen and (max-width: 700px) {
      margin: 0 auto;
      display: block;
      > * {
        display: flex;
      }
    }
    @media screen and (max-width: 500px) {
      font-size: 0.85rem;
      width: 200px;
    }
  }
`

export const Blob = styled.div`
  background-image: url('blob.svg');
  height: 400px;
  width: 400px;
  position: absolute;
  background-size: contain;
  right: 150px;
  top: 230px;
  display: grid;
  place-items: center;
  svg {
    height: 150px;
    width: 150px;
    color: ${({ theme }) => theme.palette.themeText.themeWhite};
  }

  @media screen and (max-width: 1150px) {
    height: 300px;
    width: 300px;
    top: 300px;
    right: 100px;
    svg {
      height: 120px;
      width: 120px;
    }
  }

  @media screen and (max-width: 950px) {
    height: 250px;
    width: 250px;
    top: 350px;
    right: 60px;
    svg {
      height: 100px;
      width: 100px;
    }
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`

export const StepContainer = styled.div`
  display: flex;
  height: 60vh;

  @media screen and (min-width: ${LG}px) {
    :nth-child(odd) {
      .step {
        right: 10%;
      }
    }
    :nth-child(even) {
      .step {
        left: 10%;
      }
    }
  }
`

export const Step = styled.section`
  height: 100%;
  padding: 50px 0;
  margin: 0 auto;
  position: relative;
  max-width: 60%;

  h1 {
    font-size: 24px;
    font-weight: 500;
    padding: 5px 25px;
    margin: 0;
    border-radius: 30px 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.palette.themeText.white};
    background: ${({ theme }) => theme.palette.gradients.primary};
    position: absolute;
    top: 50px;
    left: 0;
  }

  img {
    flex: 1;
    object-fit: contain;
    display: block;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    ${({ theme }) =>
      theme.palette.isDark &&
      css`
        border: solid 1px ${theme.palette.grey[800]};
      `};
  }

  @media screen and (max-width: ${MD}px) {
    h1 {
      font-size: 1rem;
    }
    max-width: 100%;
  }
`

export const StepLine = styled.div<{ position?: 'first' | 'last' }>`
  margin-right: 30px;
  position: relative;
  width: 1px;
  background: ${({ theme }) => theme.palette.themeText.themeGray};

  ${({ position }) => position === 'first' && 'margin-top: 30vh'};
  ${({ position }) => position === 'last' && 'margin-bottom: 30vh'};

  ::before {
    content: '';
    position: absolute;
    top: ${({ position }) => (position === 'first' ? 0 : position === 'last' ? '100%' : '50%')};
    left: -7px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.gradients.primary};
  }
`

export const Footer = styled.footer`
  height: 70vh;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: grid;
  place-items: center;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${({ theme }) => theme.palette.primary.main};
      font-size: 3em;
    }
  }
`
