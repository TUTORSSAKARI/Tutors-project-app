import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedText = ({ style, title = false, ...props }) => {
  const colorScheme = useColorScheme()           // Palauttaa 'light' tai 'dark'
  const theme = Colors[colorScheme] ?? Colors.light  // Valitaan teemavärit

  const textColor = title ? theme.title : theme.text  // Jos title, käytä otsikkoväriä

  return (
    <Text 
      style={[{ color: textColor }, style]}  // yhdistetään mahdolliset ulkoiset tyylit
      {...props}                             // välitetään kaikki muut propsit
    />
  )
}

export default ThemedText
