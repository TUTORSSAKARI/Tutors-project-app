import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

// ThemedButton on nappikomponentti, joka käyttää oletusteemasta tulevaa väriä
// ja muuttaa hieman läpinäkyväksi painettaessa (feedback)
function ThemedButton({ style, ...props }) {

  return (
    <Pressable 
      // 'pressed' antaa palautteen, kun nappia painetaan
      // yhdistetään oletustyyli, painallustyyli ja mahdollinen ulkoinen tyyli
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]} 
      {...props} // välitetään kaikki muut propit (esim. onPress)
    />
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary, // nappi pääväri
    padding: 18,                     // sisäiset marginaalit
    borderRadius: 6,                 // pyöristetyt kulmat
    marginVertical: 10               // pystysuuntainen marginaali
  },
  pressed: {
    opacity: 0.5                     // nappi puoliksi läpinäkyvä painettaessa
  },
})

export default ThemedButton
