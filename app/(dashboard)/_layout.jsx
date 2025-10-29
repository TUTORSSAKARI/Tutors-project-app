import { Tabs } from "expo-router" // Tuodaan välilehtinavigointi expo-routerista
import { useColorScheme } from "react-native" // Käytetään laitteen väriteemaa (vaalea/tumma)
import { Colors } from "../../constants/Colors" // Tuodaan sovelluksen väriteemat
import { Ionicons } from "@expo/vector-icons" // Ikonit välilehtiä varten

import UserOnly from "../../components/auth/UserOnly" // Komponentti, joka sallii vain kirjautuneet käyttäjät

export default function DashboardLayout() {
  const colorScheme = useColorScheme() // Selvitetään käyttäjän väriteema
  const theme = Colors[colorScheme] ?? Colors.light // Valitaan oikea väripaletti

  return (
    // Näkymä on suojattu vain kirjautuneille käyttäjille
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false, // Piilotetaan yläpalkki
          tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 90 }, // Asetetaan välilehtipalkin tyyli
          tabBarActiveTintColor: theme.iconColorFocused, // Aktiivisen välilehden väri
          tabBarInactiveTintColor: theme.iconColor, // Passiivisen välilehden väri
        }}
      >

        {/* Profiili-välilehti */}
        <Tabs.Screen 
          name="profile"
          options={{ 
            title: "Profile", 
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'person' : 'person-outline'} // Vaihtaa ikonia, kun välilehti on aktiivinen
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            ) 
          }}
        />

        {/* Kirjat-välilehti */}
        <Tabs.Screen 
          name="books"
          options={{ 
            title: "Books", 
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'book' : 'book-outline'} 
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            ) 
          }} 
        />

        {/* Luo-välilehti */}
        <Tabs.Screen 
          name="create"
          options={{ 
            title: "Create", 
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'create' : 'create-outline'} 
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            ) 
          }} 
        />

      </Tabs>
    </UserOnly>
  )
}
