import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper'; // Para usar el tema de Paper
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para los iconos

export default function ClientLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Muestra la cabecera por defecto para las pantallas de las pestañas
        tabBarActiveTintColor: theme.colors.primary, // Color de ícono/texto activo
        //tabBarInactiveTintColor: theme.colors.text,  // Color de ícono/texto inactivo
        tabBarStyle: {
          backgroundColor: theme.colors.surface, // Color de fondo de la barra de pestañas
          borderTopWidth: 1,
          borderTopColor: theme.colors.backdrop, // Pequeña línea superior
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home" // Corresponde a src/app/(client)/home.tsx
        options={{
          title: 'Inicio', // Título en la cabecera y en la pestaña
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search" // Corresponde a src/app/(client)/search.tsx
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests" // Corresponde a src/app/(client)/requests.tsx
        options={{
          title: 'Mis Solicitudes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponde a src/app/(client)/profile.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}