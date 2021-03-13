import { Menu, MenuItem, Input } from '@material-ui/core'
import styled from 'styled-components'

export const StyledMenu = styled(Menu)`
  :focus {
    outline: none;
  }

  .MuiPaper-rounded {
    border-radius: 12px;
  }

  .MuiMenu-paper {
    background-color: ${({ theme }) => (theme.type == 'dark' ? theme.grey[700] : theme.grey[200])};
  }
`
export const MenuContent = styled.div`
  min-width: 200px;
  padding: 10px 0;
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 25px;
  color: ${({ theme }) => theme.themeText.themeGray};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.05rem;

  gap: 7px;

  :last-child svg {
    color: ${({ theme }) => theme.error.light};
  }
`
export const StyledInput = styled(Input)`
  display: none;
`
