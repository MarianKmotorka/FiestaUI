import styled from 'styled-components'
import { Button, Card } from '@material-ui/core'
import Image from 'next/image'
import { MD, SM } from '@contextProviders/AppThemeProvider/theme'

export const Wrapper = styled.div`
  position: relative;
  padding: 30px 0;
`

export const BlurredImage = styled(Image)`
  object-fit: cover;
  filter: blur(100px);
  display: block;
`

export const StyledCard = styled(Card)`
  padding: 40px;
  margin-top: 30px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.paper + 'ee'};
  box-shadow: ${({ theme }) => theme.shadows[10]};
  ::first-letter {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  @media screen and (max-width: ${MD}px) {
    padding: 30px;
    margin-top: 15px;
  }

  @media screen and (max-width: ${SM}px) {
    padding: 20px;
  }
`

export const Title = styled.h1`
  ${({ theme }) => theme.typography.h4 as any};
  margin: 10px 0 20px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`

export const EventDescription = styled.p`
  ${({ theme }) => theme.typography.body1 as any};
  font-weight: 300;
  white-space: pre-wrap;
  word-break: break-word;
`

export const InfoRow = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;

  h6 {
    margin: 0;
    ${({ theme }) => theme.typography.body1 as any};
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;

    svg {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  > div {
    ${({ theme }) => theme.typography.body1 as any};
  }
`

export const Organizer = styled(Button)`
  span {
    ::first-letter {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .MuiAvatar-root {
    width: 28px;
    height: 28px;
  }
`
