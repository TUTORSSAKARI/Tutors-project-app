import { Client, Account, Avatars, Databases } from "react-native-appwrite"

// Luodaan Appwrite-asiakas
export const client = new Client()

// Konfiguroidaan asiakas
client
  .setEndpoint('https://syd.cloud.appwrite.io/v1') // Appwrite-palvelimen URL
  .setProject('68de16dc001b24b06e14')              // Projekti-ID Appwritessa
  .setPlatform('dev.shelfie.sheflie')             // Alusta, jota käytetään (valinnainen)

// Luodaan eri palvelut asiakasta varten
export const account = new Account(client)        // Käyttäjätilien hallinta (login, register, session)
export const avatars = new Avatars(client)        // Profiilikuva- ja avatar-palvelut
export const databases = new Databases(client)    // Tietokantaoperaatiot (CRUD)
