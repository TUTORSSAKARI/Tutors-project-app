import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native' // Tuodaan tarvittavat React Native -komponentit
import { Link } from 'expo-router' // Tuodaan Link-navigointikomponentti
import { useState } from 'react' // Reactin hook tilanhallintaan
import { useUser } from '../../hooks/useUser' // Tuodaan oma käyttäjähook kirjautumista varten
import { Colors } from '../../constants/Colors' // Tuodaan väriteema

// Tuodaan teemakomponentit ja apukomponentit
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from "../../components/ThemedTextInput"

const Login = () => {
  // Tilamuuttujat sähköpostille, salasanalle ja virheilmoitukselle
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()

  // Haetaan käyttäjän kirjautumistoiminnot custom-hookista
  const { user, login } = useUser()

  // Käsitellään kirjautuminen
  const handleSubmit = async () => {
    setError(null) // Nollataan virhetila ennen uutta yritystä

    try {
      await login(email, password) // Yritetään kirjautua annetulla sähköpostilla ja salasanalla
    } catch (error) {
      setError(error.message) // Näytetään virheviesti epäonnistuessa
    }
  }

  return (
    // Suljetaan näppäimistö, kun käyttäjä napauttaa ruutua
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        
        {/* Väli komponenttien väliin */}
        <Spacer />

        {/* Otsikko */}
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>

        <Spacer />

        {/* Sähköpostin syöttökenttä */}
        <ThemedTextInput
          style={{ marginBottom: 20, width: "80%" }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Salasanan syöttökenttä */}
        <ThemedTextInput
          style={{ marginBottom: 20, width: "80%" }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Kirjautumispainike */}
        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>Login</Text>
        </ThemedButton>

        <Spacer />

        {/* Näytetään virheviesti, jos kirjautuminen epäonnistuu */}
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />

        {/* Linkki rekisteröitymissivulle */}
        <Link href="/register" replace>
          <ThemedText style={{ textAlign: "center" }}>
            Register instead
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

// Tyylit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})
