import { Image, useColorScheme } from 'react-native'

// Kaksi logovaihtoehtoa teemojen mukaan
import DarkLogo from '../assets/img/logo_dark.png'
import LightLogo from '../assets/img/logo_light.png'

const ThemedLogo = () => {
  const colorScheme = useColorScheme() // tarkistaa, onko laite dark vai light -tila
  
  // Valitaan logo sen mukaan
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  return (
    <Image source={logo} /> // Näytetään valittu logo
  )
}

export default ThemedLogo
