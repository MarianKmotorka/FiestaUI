import { Menu, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const StyledMenu = styled(Menu)`
  :focus {
    outline: none;
  }

  .MuiPaper-rounded {
    border-radius: 8px;
  }

  .MuiMenu-paper {
    background-color: ${({ theme }) => (theme.type == 'dark' ? theme.grey[900] : theme.grey[100])};
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

  gap: 10px;

  &#deleteMenuItem svg {
    color: ${({ theme }) => theme.error.light};
  }
`
export const StyledInput = styled.input`
  display: none;
`
