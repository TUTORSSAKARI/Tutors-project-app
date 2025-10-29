import { View } from 'react-native'

// Spacer-komponentti lisää tyhjää tilaa (marginaalia) ylös, alas tai sivuille
// Oletuskoko: leveys 100% ja korkeus 40
const Spacer = ({ width = "100%", height = 40 }) => {
  return (
    <View style={{ width, height }} />
  )
}

export default Spacer
