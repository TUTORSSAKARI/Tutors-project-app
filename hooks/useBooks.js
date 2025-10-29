import { useContext } from "react"
import { BooksContext } from "../contexts/BooksContext"

// Custom hook kirjaston hallintaan
export function useBooks() {
  // Haetaan konteksti
  const context = useContext(BooksContext)

  // Jos kontekstia ei ole, hookia käytetään väärässä paikassa
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider")
  }

  // Palautetaan kontekstin arvot (esim. kirjat, createBook-funktio)
  return context
}
