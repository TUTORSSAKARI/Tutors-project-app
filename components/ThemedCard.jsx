import { StyleSheet, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'

// ThemedCard on korttityylinen View-komponentti, joka käyttää nykyistä väriteemaa
const ThemedCard = ({ style, ...props }) => {
  const colorScheme = useColorScheme() // tarkistaa light/dark tilan
  const theme = Colors[colorScheme] ?? Colors.light // fallback light-teemaan

  return (
    <View 
      // yhdistetään taustaväri teemasta, kortin oletustyyli ja ulkoinen tyyli
      style={[{ backgroundColor: theme.uiBackground}, styles.card, style]}
      {...props} // välitetään kaikki muut propit (esim. children, onPress)
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 5, // pyöristetyt kulmat
    padding: 20      // sisäinen marginaali
  }
})