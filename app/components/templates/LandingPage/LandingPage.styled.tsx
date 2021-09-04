import styled, { css, keyframes } from 'styled-components'
import { fadeInDown, fadeInLeft, fadeInRight } from 'react-animations'
import { LG, MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div``

export const Layer1 = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
`
export const Layer2 = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: drop-shadow(0 10px 5px rgba(0, 0, 0, 0.2));
`

export const HeroSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  padding-bottom: 100px;

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
    animation: ${keyframes`${fadeInDown}`} 1s ease-out;
    @media screen and (max-width: 800px) {
      font-size: 3rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 2rem;
      text-align: center;
    }
    span {
      background: ${({ theme }) => theme.palette.gradients.primary};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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

export const StepsSection = styled.section`
  position: relative;
  padding: 250px 0 150px;
`

export const StepContainer = styled.div<{ inView: boolean }>`
  display: flex;
  height: 70vh;

  @media screen and (max-width: 450px) {
    height: 50vh;
  }

  @media screen and (min-width: ${LG}px) {
    :nth-child(odd) {
      .step {
        opacity: 0;
        display: none;
        right: 12%;
        ${({ inView }) =>
          inView &&
          css`
            display: block;
            opacity: 1;
            animation: ${keyframes`${fadeInRight}`} 1s ease-in-out;
          `}
      }
    }
    :nth-child(even) {
      .step {
        opacity: 0;
        display: none;
        left: 12%;
        ${({ inView }) =>
          inView &&
          css`
            display: block;
            opacity: 1;
            animation: ${keyframes`${fadeInLeft}`} 1s ease-in-out;
          `}
      }
    }
  }
`

export const Step = styled.section`
  height: 100%;
  padding: 70px 0;
  margin: 0 auto;
  position: relative;
  max-width: 60%;

  h1 {
    font-size: 24px;
    font-weight: 500;
    padding: 5px 25px;
    margin: 0;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.palette.themeText.white};
    background: ${({ theme }) => theme.palette.gradients.primary};
    position: absolute;
    top: 50px;
    left: -15px;
  }

  img {
    flex: 1;
    object-fit: contain;
    display: block;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
    background: ${({ theme }) => theme.palette.background.default};
    ${({ theme }) =>
      theme.palette.isDark &&
      css`
        border: solid 1px ${theme.palette.grey[800]};
      `};
  }

  ::after {
    content: '';
    position: absolute;
    width: 70%;
    height: 50%;
    bottom: 40px;
    right: -30px;
    background: ${({ theme }) => theme.palette.gradients.primary};
    z-index: -1;
    border-radius: 5px;
  }

  @media screen and (max-width: ${LG}px) {
    max-width: 80%;
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

  ${({ position }) => position === 'first' && 'margin-top: 35vh'};
  ${({ position }) => position === 'last' && 'margin-bottom: 35vh'};

  @media screen and (max-width: 450px) {
    ${({ position }) => position === 'first' && 'margin-top: 25vh'};
    ${({ position }) => position === 'last' && 'margin-bottom: 25vh'};
  }

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
  height: 50vh;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 50px 0;

  .footer-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .logo {
      > * {
        font-size: 3rem;
        z-index: 100;
        margin: 0;

        @media screen and (max-width: ${SM}px) {
          font-size: 2rem;
        }
      }
    }

    .socials {
      display: flex;
      justify-content: flex-end;

      svg {
        font-size: 3em;
        margin-left: 10px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;

        :hover {
          color: ${({ theme }) => theme.palette.primary.main};
          transform: scale(1.05);
        }
      }
    }
  }
`
