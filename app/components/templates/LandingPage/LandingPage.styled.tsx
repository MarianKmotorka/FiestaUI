import styled, { css } from 'styled-components'
import { MD } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div`
  background-color: ${({ theme }) =>
    theme.palette.isDark ? '#001220' : theme.palette.background.default};
`

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
`

export const Step = styled.section`
  flex: 1;
  padding: 50px 0;

  > .img-wrapper {
    width: 100%;
    max-width: 60%;
    margin: 0 auto;
    position: relative;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 10px 25px;
    margin: 0;
    border-radius: 150px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.palette.themeText.white};
    background: ${({ theme }) => theme.palette.gradients.primary};
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    flex: 1;
    object-fit: contain;
    margin: 0 auto;
    display: block;
    width: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: ${MD}px) {
    h1 {
      font-size: 1rem;
      padding: 7px 12px;
      font-weight: 300;
    }
    > .img-wrapper {
      max-width: 100%;
    }
  }
`

export const StepLine = styled.div<{ isFirst?: 1 | 0 }>`
  margin-right: 30px;
  position: relative;
  width: 1px;
  background: ${({ theme }) => theme.palette.themeText.themeGray};

  ${({ isFirst }) => isFirst && 'margin-top:70px'};

  ::before {
    content: '';
    position: absolute;
    top: ${({ isFirst }) => (isFirst ? 0 : '70px')};
    left: -7px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.gradients.primary};
  }
`
