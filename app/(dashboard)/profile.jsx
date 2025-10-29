import { StyleSheet, Text } from 'react-native' // Tuodaan React Native -komponentit
import { useUser } from '../../hooks/useUser' // Tuodaan custom-hook käyttäjän tietojen ja toimien käsittelyyn

// Tuodaan sovelluksen omat komponentit
import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {
  // Haetaan käyttäjän tiedot ja uloskirjautumistoiminto custom-hookista
  const { logout, user } = useUser()

  return (
    // Teemoitettu näkymä, joka toimii profiilisivun säiliönä
    <ThemedView style={styles.container}>

      {/* Käyttäjän sähköpostiosoite otsikkona */}
      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>

      {/* Väli elementtien väliin */}
      <Spacer />

      {/* Tervetuloteksti */}
      <ThemedText>Time to start reading some books...</ThemedText>

      <Spacer />

      {/* Uloskirjautumispainike */}
      <ThemedButton onPress={logout} style={styles.button}>
        <Text style={{ color: '#f2f2f2' }}>Logout</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

// Tyylit profiilisivulle
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Keskitetään pystysuunnassa
    alignItems: "center", // Keskitetään vaakasuunnassa
  },
  heading: {
    fontWeight: "bold", // Lihavoitu otsikko
    fontSize: 18, // Otsikon koko
    textAlign: "center", // Tekstin keskitys
  },
})
