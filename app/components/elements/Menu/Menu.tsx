import { Menu as MuiMenu, MenuItem as MuiMenuItem } from '@material-ui/core'
import styled from 'styled-components'

export const Menu = styled(MuiMenu)`
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

export const MenuItem = styled(MuiMenuItem)`
  padding: 10px 20px;
  color: ${({ theme }) => theme.themeText.themeGray};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.95rem;

  gap: 10px;
`
