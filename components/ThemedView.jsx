import { useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({ style, safe = false, ...props }) => {
  const colorScheme = useColorScheme()                 // Tarkistaa laitteen teeman ('light' tai 'dark')
  const theme = Colors[colorScheme] ?? Colors.light    // Valitaan teemavärit

  if (!safe) return (
    <View
      style={[{ backgroundColor: theme.background }, style]} // Käytetään vain taustaväriä
      {...props}
    />
  )

  const insets = useSafeAreaInsets()  // Hakee laitteen safe area -arvot (esim. iPhone notch)
  
  return (
    <View 
      style={[
        { 
          backgroundColor: theme.background,
          paddingTop: insets.top,       // lisää ylä- ja alareunan safe area paddingin
          paddingBottom: insets.bottom,
        }, 
        style
      ]} 
      {...props}
    />
  )
}

export default ThemedView
