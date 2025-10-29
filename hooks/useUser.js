import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

// Custom hook käyttäjän hallintaan
export function useUser() {
  // Haetaan konteksti
  const context = useContext(UserContext)

  // Jos kontekstia ei ole, hookia käytetään väärässä paikassa
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }

  // Palautetaan kontekstin arvot (esim. user, login, logout, register, authChecked)
  return context
}
