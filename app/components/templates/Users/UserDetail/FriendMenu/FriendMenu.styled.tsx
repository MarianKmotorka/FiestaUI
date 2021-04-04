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
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 20px;
  color: ${({ theme }) => theme.themeText.themeGray};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1em;

  gap: 10px;

  &#removeMenuItem svg {
    color: ${({ theme }) => theme.error.light};
  }
`
