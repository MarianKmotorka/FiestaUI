import Divider from '@elements/Divider'
import { Avatar, Menu, MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { MD } from 'utils/theme'

export const StyledMenu = styled(Menu)`
  transform: translateY(60px);

  :focus {
    outline: none;
  }

  @media screen and (max-width: ${MD}px) {
    transform: translateY(140px);
  }

  .MuiPaper-rounded {
    border-radius: 12px;
  }
`

export const StyledDivider = styled(Divider)`
  margin: 20px 25px 20px;
`

export const MenuContent = styled.div`
  min-width: 280px;
  padding: 10px 0;
`

export const StyledAvatar = styled(Avatar)`
  height: 55px;
  width: 55px;
  margin: 0 auto;
  display: block;
  cursor: pointer;

  .MuiAvatar-fallback {
    height: 45px;
    width: 45px;
    color: ${({ theme }) => theme.themeText.themeGray};
    display: block;
    margin: 4px auto 0;
  }
`

export const Name = styled.h1`
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.themeText.themeBlack};
  cursor: pointer;
  margin: 12px auto 0;
  width: 90%;

  :hover {
    text-decoration: underline;
  }

  ::first-letter {
    color: ${({ theme }) => theme.primary.main};
  }
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 25px;
  color: ${({ theme }) => theme.themeText.themeGray};

  display: flex;
  justify-content: center;
  font-size: 1.05rem;

  #lightThemeIcon {
    color: ${({ theme }) => theme.primary.main};
  }

  svg {
    margin-left: auto;
  }
`
