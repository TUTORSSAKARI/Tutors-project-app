import { Stack } from "expo-router" // Tuodaan Stack-navigointi expo-routerista
import { StatusBar } from "react-native" // Tuodaan StatusBar komponentti React Nativesta

import GuestOnly from "../../components/auth/GuestOnly" // Tuodaan oma komponentti, joka sallii vain kirjautumattomat käyttäjät

export default function AuthLayout() {
  return (
    // Vain kirjautumattomat käyttäjät voivat käyttää tätä näkymää
    <GuestOnly>
      {/* Asetetaan tilapalkin tyyli automaattiseksi */}
      <StatusBar style="auto" />

      {/* Määritellään navigointipino ilman otsikkopalkkia ja animaatiota */}
      <Stack 
        screenOptions={{ headerShown: false, animation: "none" }} 
      />
    </GuestOnly>
  )
}
