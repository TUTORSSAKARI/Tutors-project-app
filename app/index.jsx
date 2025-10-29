import { StyleSheet } from 'react-native' // Tuodaan StyleSheet tyylien määrittelyyn
import { Link } from 'expo-router' // Navigointikomponentti eri sivuille

// Tuodaan omat teemoitetut komponentit
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import ThemedLogo from "../components/ThemedLogo"
import Spacer from "../components/Spacer"
import { Colors } from '../constants/Colors' // Väriteemat

const Home = () => {
  return (
    // Pääsäiliö teemoitetulla näkymällä
    <ThemedView style={styles.container}>
      
      {/* Sovelluksen logo */}
      <ThemedLogo />

      {/* Väli komponenttien väliin */}
      <Spacer />

      {/* Sovelluksen nimi */}
      <ThemedText style={styles.title} title={true}>The Number 1</ThemedText>

      {/* Lyhyt kuvaus */}
      <ThemedText style={{ marginTop: 10, marginBottom: 30 }}>
        Reading List App
      </ThemedText>

      {/* Navigointilinkit eri sivuille */}
      <Link href="/login" style={styles.link}>
        <ThemedText>Login</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile</ThemedText>
      </Link>

    </ThemedView>
  )
}

export default Home

// Tyylit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Keskitetään vaakasuunnassa
    justifyContent: 'center', // Keskitetään pystysuunnassa
  },
  img: {
    marginVertical: 20
  },
  title: {
    fontWeight: 'bold', // Lihavoitu otsikko
    fontSize: 18, // Fonttikoko otsikolle
  },
  link: {
    marginVertical: 10, // Väli linkkien välillä
    borderBottomWidth: 1 // Alaviiva linkin alle
  },
})
