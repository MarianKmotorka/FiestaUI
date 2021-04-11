import { UseWindowSizeReturn } from '@hooks/useWindowSize'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const desktopTypo: TypographyOptions = {
  h4: {
    fontSize: '2.2rem'
  }
}

const tabletTypo: TypographyOptions = {
  h4: {
    fontSize: '2rem'
  }
}

const mobileTypo: TypographyOptions = {
  h4: {
    fontSize: '1.5rem'
  }
}

export const getTypographyOptions = ({
  maxMedium,
  maxSmall
}: UseWindowSizeReturn): TypographyOptions => {
  let newTypo: TypographyOptions = desktopTypo

  if (maxSmall) newTypo = mobileTypo
  else if (maxMedium) newTypo = tabletTypo

  return {
    button: {
      textTransform: 'none',
      fontWeight: 400
    },
    ...newTypo
  }
}
