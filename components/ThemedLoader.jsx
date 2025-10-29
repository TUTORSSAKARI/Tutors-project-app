import { ActivityIndicator, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

import ThemedView from './ThemedView'

// ThemedLoader näyttää pyörivän latausindikaattorin keskellä ruutua
// väri mukautuu nykyiseen light/dark -teemaan
const ThemedLoader = () => {
  const colorScheme = useColorScheme() // tarkistaa light/dark tilan
  const theme = Colors[colorScheme] ?? Colors.light // fallback light-teemaan

  return (
    <ThemedView style={{ 
      flex: 1, 
      justifyContent: "center", // keskitetään pystysuunnassa
      alignItems: "center"      // keskitetään vaakasuunnassa
    }}>
      <ActivityIndicator 
        size="large"          // suuri pyörivä indikaattori
        color={theme.text}    // väri teemasta
      />
    </ThemedView>
  )
}

export default ThemedLoader
