import { createContext, useEffect, useState } from "react"
import { account } from "../lib/appwrite" // Appwriten account SDK
import { ID } from "react-native-appwrite"

// Luo käyttäjäkonteksti, joka voidaan jakaa koko sovellukselle
export const UserContext = createContext()

export function UserProvider({ children }) {
  // Tila, jossa tallennetaan kirjautunut käyttäjä (tai null jos ei kirjautunut)
  const [user, setUser] = useState(null)
  // Tila, joka kertoo, onko autentikointi tarkistettu
  const [authChecked, setAuthChecked] = useState(false)

  // Funktio kirjautumiseen
  async function login(email, password) {
    try {
      // Luo sessio käyttäjälle
      await account.createEmailPasswordSession(email, password)
      // Hakee käyttäjän tiedot
      const response = await account.get()
      setUser(response)
    } catch (error) {
      throw Error(error.message)
    }
  }

  // Funktio rekisteröitymiseen
  async function register(email, password) {
    try {
      // Luo uusi käyttäjä Appwriteen
      await account.create(ID.unique(), email, password)
      // Kirjaa käyttäjän automaattisesti sisään
      await login(email, password)
    } catch (error) {
      throw Error(error.message)
    }
  }

  // Funktio uloskirjautumiseen
  async function logout() {
    await account.deleteSession("current") // Poistaa nykyisen session
    setUser(null)
  }

  // Hakee käyttäjän tiedot sovelluksen käynnistyessä
  async function getInitialUserValue() {
    try {
      const res = await account.get()
      setUser(res) // Jos kirjautunut, aseta user
    } catch (error) {
      setUser(null) // Ei kirjautunut
    } finally {
      setAuthChecked(true) // Autentikointi tarkistettu
    }
  }

  // Suoritetaan kerran komponentin mountissa
  useEffect(() => {
    getInitialUserValue()
  }, [])

  // Tarjoaa kontekstin arvot lapsikomponenteille
  return (
    <UserContext.Provider value={{ 
      user, login, logout, register, authChecked
    }}>
      {children}
    </UserContext.Provider>
  );
}

// HUOM: Käytä <UserProvider> wrapataksesi root layoutin Stack-komponentin
