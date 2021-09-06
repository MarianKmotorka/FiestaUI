import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
from{
  transform:scale(0.8);
}
to{
  transform:scale(1.1);
}
`

export const Wrapper = styled.div`
  padding-bottom: 50px;
`

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-items: center;
`

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  width: 100%;
  width: 320px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;

  :hover .banner {
    transform: scale(1.2);
  }
`

export const TopWrapper = styled.div`
  height: 55%;
  position: relative;
`

export const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  .banner {
    transition: transform 0.3s ease-out;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`

export const StartDate = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 90px;
  top: -45px;
  right: 10px;
  border: 10px solid ${({ theme }) => theme.palette.background.paper};
  background: ${({ theme }) => theme.palette.gradients.primary};
  color: ${({ theme }) => theme.palette.themeText.white};
  margin-left: auto;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  transition: top 0.3s ease-in-out;
  cursor: pointer;

  svg {
    display: none;
    font-size: 3rem;
    animation: ${pulse} 0.65s alternate infinite ease-in-out;
  }
`

export const BottomWrapper = styled.div`
  padding: 0 20px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 225px;
  border-radius: 25px 25px 0 0;
  background: ${({ theme }) => theme.palette.background.paper};
  transition: height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;

  h3 {
    padding: 12px 90px 0 0;
    margin: 0;
    font-size: 1.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 500;

    span {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  p {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.themeText.themeGray};
    margin: 10px 0;
    svg {
      color: ${({ theme }) => theme.palette.themeText.themeBlack};
      margin-right: 7px;
    }
    .username {
      font-weight: 500;
      cursor: pointer;
      ::first-letter {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }

  .event-info {
    flex: 1;

    .event-description {
      display: none;
    }
  }

  :hover {
    height: 380px;

    .start-date-avatar {
      top: 0;
      span {
        display: none;
      }
      svg {
        display: block;
      }
    }
    .event-info {
      overflow-y: auto;
    }
    .event-description {
      display: block;
    }
  }
`
