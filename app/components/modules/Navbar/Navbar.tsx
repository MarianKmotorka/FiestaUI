import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons'
import { Avatar, Button, ButtonGroup, Chip, IconButton } from '@material-ui/core'

import useWindowSize from '@hooks/useWindowSize'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '@contextProviders/AuthProvider'

import { Logo, Menu, NavLink, StyledAppBar, StyledContainer } from './Navbar.styled'

const Navbar = () => {
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { maxMedium } = useWindowSize()
  const [menuOpen, setMenuOpen] = useState(false)
  const showMenu = !maxMedium || (maxMedium && menuOpen)

  const pushAndClose = (path: string) => () => {
    setMenuOpen(false)
    router.push(path)
  }

  return (
    <StyledAppBar elevation={0}>
      <StyledContainer>
        <Logo onClick={() => router.push('/')} />

        <AnimatePresence>
          {showMenu && (
            <Menu
              initial={{ bottom: '100%' }}
              animate={{ bottom: 0 }}
              exit={{ bottom: '100%' }}
              transition={{
                type: { damping: 2 }
              }}
            >
              {!auth.isLoggedIn && (
                <ButtonGroup size={maxMedium ? 'large' : 'medium'}>
                  <Button variant='contained' onClick={pushAndClose('/login')}>
                    {t('login')}
                  </Button>

                  <Button color='primary' variant='contained' onClick={pushAndClose('/signup')}>
                    {t('signup')}
                  </Button>
                </ButtonGroup>
              )}

              {auth.isLoggedIn && (
                <>
                  <Link href='/home'>
                    <NavLink>Home</NavLink>
                  </Link>

                  <Link href='/places'>
                    <NavLink>Places</NavLink>
                  </Link>

                  <Link href='/people'>
                    <NavLink>People</NavLink>
                  </Link>

                  <Chip
                    avatar={<Avatar src={auth.currentUser.pictureUrl} />}
                    label={auth.currentUser.fullName}
                    clickable
                    onDelete={auth.logout}
                    color='primary'
                  />
                </>
              )}
            </Menu>
          )}
        </AnimatePresence>

        {maxMedium && (
          <IconButton color='primary' onClick={() => setMenuOpen(prev => !prev)}>
            {menuOpen ? (
              <CloseIcon style={{ fontSize: '2rem' }} />
            ) : (
              <MenuIcon style={{ fontSize: '2rem' }} />
            )}
          </IconButton>
        )}
      </StyledContainer>
    </StyledAppBar>
  )
}

export default Navbar
