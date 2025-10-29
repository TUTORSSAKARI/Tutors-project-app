import { useUser } from '../../hooks/useUser' // käyttäjä- ja autentikointitiedot
import { useRouter } from 'expo-router' // navigointi
import { useEffect } from 'react'

import ThemedLoader from '../ThemedLoader' // latauskomponentti

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser() // haetaan käyttäjä ja autentikoinnin tila
  const router = useRouter()
  
  // Jos autentikointi on tarkistettu ja käyttäjä ei ole kirjautunut, ohjataan login-sivulle
  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login")
    }
  }, [user, authChecked])

  // Näytetään latauskomponentti kun autentikointia tarkistetaan
  // tai kun käyttäjä on null ja ohjataan login-sivulle
  if (!authChecked || !user) {
    return (
      <ThemedLoader />
    )
  }
  
  // Jos käyttäjä on kirjautunut, renderöidään lapset
  return children
}

export default UserOnly
