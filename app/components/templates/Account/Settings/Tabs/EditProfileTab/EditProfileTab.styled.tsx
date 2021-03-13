import Divider from '@elements/Divider'
import styled from 'styled-components'
import { MD, LG } from 'utils/theme'
import Spinner from '@elements/Spinner'
import { Avatar } from '@material-ui/core'

export const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    width: 100%;

    > * + * {
      margin-top: 20px;
    }

    button {
      width: 150px;
      margin-top: 30px;
    }
  }

  @media screen and (min-width: ${MD}px) {
    padding-left: 30px;
  }
`

export const StyledAvatar = styled(Avatar)`
  height: 200px;
  width: 200px;
  margin: 0;
  display: block;
  cursor: pointer;

  .MuiAvatar-fallback {
    height: 180px;
    width: 180px;
    color: ${({ theme }) => theme.themeText.themeGray};
    display: block;
    margin: 17px auto 0;
  }

  @media screen and (max-width: ${LG}px) {
    height: 150px;
    width: 150px;

    .MuiAvatar-fallback {
      height: 140px;
      width: 140px;
      margin-top: 5px;
    }
  }

  @media screen and (max-width: ${MD}px) {
    height: 100px;
    width: 100px;

    .MuiAvatar-fallback {
      height: 90px;
      width: 90px;
      margin-top: 0;
    }
  }
`
export const StyledDivider = styled(Divider)`
  margin: 20px 5px 20px;
`

export const StyledSpinner = styled(Spinner)`
  color: ${({ theme }) => theme.themeText.themeGray};
`
