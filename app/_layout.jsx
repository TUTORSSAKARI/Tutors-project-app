import { Stack } from "expo-router" // Tuodaan Stack-navigointi expo-routerista
import { Colors } from "../constants/Colors" // Tuodaan sovelluksen väriteema
import { useColorScheme } from "react-native" // Käytetään laitteen väriteemaa (vaalea/tumma)
import { StatusBar } from "expo-status-bar" // Tuodaan tilapalkin hallinta
import { UserProvider } from "../contexts/UserContext" // Konteksti käyttäjätietojen hallintaan
import { BooksProvider } from "../contexts/BooksContext" // Konteksti kirjojen hallintaan

export default function RootLayout() {
  // Selvitetään laitteen väriteema
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light // Valitaan oikea teema (tumma tai vaalea)

  return (
    // Koko sovellus kääritään konteksteihin, jotta käyttäjä- ja kirjatiedot ovat globaalisti saatavilla
    <UserProvider>
      <BooksProvider>

        {/* Tilapalkin asetus automaattiseksi */}
        <StatusBar value="auto" />

        {/* Stack-navigointi määrittää eri näkymien hierarkian */}
        <Stack 
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground }, // Otsikkopalkin taustaväri
            headerTintColor: theme.title, // Tekstin ja ikonien väri otsikkopalkissa
          }}
        >

          {/* Näkymäryhmät (hakemistot) */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} /> {/* Kirjautumisnäkymät */}
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} /> {/* Päänäkymät kirjautuneille */}

          {/* Yksittäinen näkymä (etusivu) */}
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
        
      </BooksProvider>
    </UserProvider>
  )
}
