import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native' // Tuodaan React Native -komponentit
import { Link } from 'expo-router' // Tuodaan navigointikomponentti sivujen välillä
import { useState } from 'react' // Reactin hook tilanhallintaan
import { useUser } from '../../hooks/useUser' // Oma hook käyttäjänhallintaa varten

// Tuodaan teemoitetut komponentit ja apukomponentit
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from "../../components/ThemedTextInput"
import { Colors } from '../../constants/Colors' // Väriteemat

const Register = () => {
  // Tilamuuttujat syötekentille ja virheviestille
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  // Haetaan käyttäjän rekisteröintitoiminto custom-hookista
  const { user, register } = useUser()

  // Käsitellään lomakkeen lähetys
  const handleSubmit = async () => {
    setError(null) // Nollataan mahdollinen virhe ennen uutta yritystä

    try {
      await register(email, password) // Kutsutaan rekisteröinti-funktiota
      console.log('current user is: ', user) // Tulostetaan käyttäjä konsoliin (debug)
    } catch (error) {
      setError(error.message) // Näytetään virheviesti epäonnistuessa
    }
  }

  return (
    // Suljetaan näppäimistö, kun käyttäjä napauttaa ruutua
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>

        {/* Väli yläreunaan */}
        <Spacer />

        {/* Otsikko */}
        <ThemedText title={true} style={styles.title}>
          Register an Account
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

        {/* Rekisteröintipainike */}
        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: '#f2f2f2' }}>Register</Text>
        </ThemedButton>

        <Spacer />

        {/* Näytetään virheviesti, jos rekisteröinti epäonnistuu */}
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100} />

        {/* Linkki kirjautumissivulle */}
        <Link href="/login" replace>
          <ThemedText style={{ textAlign: "center" }}>
            Login instead
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

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
    margin: 10,
  }
})