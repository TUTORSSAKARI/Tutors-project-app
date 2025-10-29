import React, { createContext, useEffect, useState, useContext } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "68f9e153001d698bc208";
const TABLE_ID = "books";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  // Hakee kaikki käyttäjän kirjat
  async function fetchBooks() {
    if (!user) return;

    try {
      const response = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
        Query.equal("userId", user.$id),
      ]);

      setBooks(response.documents);
      console.log("Fetched books:", response.documents);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  }

  // Hakee yksittäisen kirjan ID:n perusteella
  async function fetchBookById(id) {
    try {
      const response = await databases.getDocument(DATABASE_ID, TABLE_ID, id);
      return response;
    } catch (error) {
      console.error("Error fetching book by ID:", error.message);
      return null;
    }
  }

  // Luo uuden kirjan
  async function createBook(data) {
    if (!user) return;

    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      // Lisää uusi kirja paikalliseen tilaan
      setBooks((prev) => [...prev, newBook]);
      console.log("Created book:", newBook);
      return newBook;
    } catch (error) {
      console.error("Error creating book:", error.message);
      return null;
    }
  }

  // Poistaa kirjan ID:n perusteella
  async function deleteBook(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);

      // Päivittää paikallisen listan poistamalla poistetun kirjan
      setBooks((prev) => prev.filter((book) => book.$id !== id));
      console.log("Deleted book with ID:", id);
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  }

  // Päivittää kirjat automaattisesti, kun käyttäjä vaihtuu
  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}

// Helppo hook BooksContextin käyttöön
export const useBooks = () => useContext(BooksContext);