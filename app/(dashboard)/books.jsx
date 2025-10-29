import { StyleSheet, FlatList, Pressable, RefreshControl, Alert } from 'react-native' // Tuodaan tarvittavat React Native -komponentit
import { useState } from 'react' // Reactin hook tilanhallintaan
import { useBooks } from '../../hooks/useBooks' // Custom-hook kirjojen käsittelyyn
import { Colors } from '../../constants/Colors' // Väriteemat

// Tuodaan omat komponentit
import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const Books = () => {
  // Haetaan kirjojen hallintatoiminnot custom-hookista
  const { books, fetchBooks, deleteBook } = useBooks()
  const [isRefreshing, setIsRefreshing] = useState(false) // Tilamuuttuja vetämällä päivitykselle

  // Päivitystoiminto (vetämällä alas)
  const onRefresh = async () => {
    setIsRefreshing(true)
    const result = await fetchBooks()
    setIsRefreshing(false)

    // Näytetään virhe, jos päivitys epäonnistui
    if (result && !result.success) {
      Alert.alert("Error", result.error || "Failed to refresh books")
    }
  }

  // Käsitellään kirjan poistaminen
  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Book", // Otsikko
      "Are you sure you want to delete this book?", // Viesti
      [
        { text: "Cancel", style: "cancel" }, // Peruuta-nappi
        { 
          text: "Delete", 
          style: "destructive", // Korostettu punaisena
          onPress: async () => {
            await deleteBook(id) // Poistetaan kirja
            Alert.alert("Deleted", "Book has been removed") // Vahvistus
          } 
        }
      ]
    )
  }

  return (
    // Pääsäiliö teemoitetulla näkymällä
    <ThemedView style={styles.container} safe={true}>

      {/* Väli yläreunaan */}
      <Spacer />

      {/* Otsikko */}
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />

      {/* Lista kirjoista */}
      <FlatList
        data={books} // Kirjadata
        keyExtractor={(item) => item.$id} // Yksilöllinen avain jokaiselle riville
        contentContainerStyle={styles.list} // Tyylit listalle
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> // Vetämällä päivitys
        }
        renderItem={({ item }) => (
          // Pitkä painallus poistaa kirjan
          <Pressable onLongPress={() => handleDelete(item.$id)}>
            <ThemedCard style={styles.card}>
              {/* Kirjan tiedot */}
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written by {item.author}</ThemedText>
              <ThemedText>Description {item.description}</ThemedText>
              <ThemedText style={styles.deleteHint}>Long press to delete</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
        // Näytetään viesti, jos listassa ei ole kirjoja
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            No books found. Pull down to refresh.
          </ThemedText>
        }
      />

    </ThemedView>
  )
}

export default Books

// Tyylit
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  deleteHint: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.warning,
    fontStyle: "italic"
  }
})
