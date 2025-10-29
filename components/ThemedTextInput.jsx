import { TextInput, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

export default function ThemedTextInput({ style, ...props }) {
  const colorScheme = useColorScheme()                  // Tarkistaa laitteen teeman: 'light' tai 'dark'
  const theme = Colors[colorScheme] ?? Colors.light    // Valitaan teemavärit, oletuksena light

  return (
    <TextInput 
      style={[
        {
          backgroundColor: theme.uiBackground, // kentän taustaväri teeman mukaan
          color: theme.text,                   // tekstin väri teeman mukaan
          padding: 20,
          borderRadius: 6,
        }, 
        style                                  // ulkoiset tyylit voivat ylikirjoittaa
      ]}
      {...props}                               // välittää kaikki muut TextInput propsit
    />
  )
}
