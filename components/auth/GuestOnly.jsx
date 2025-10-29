import { useUser } from '../../hooks/useUser' // käyttäjä- ja autentikointitiedot
import { useRouter } from 'expo-router' // navigointi
import { useEffect } from 'react'

import ThemedLoader from '../ThemedLoader' // latauskomponentti

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser() // haetaan käyttäjä ja autentikoinnin tila
  const router = useRouter()
  
  // Jos käyttäjä on kirjautunut sisään, ohjataan profiilisivulle
  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile")
    }
  }, [user, authChecked])

  // Näytetään latauskomponentti kun autentikointia tarkistetaan
  if (!authChecked || user) {
    return (
      <ThemedLoader />
    )
  }

  // Jos ei kirjautunut, renderöidään lapset
  return children
}

export default GuestOnly
