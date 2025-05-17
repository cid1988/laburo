// src/app/_layout.tsx
// Asegúrate de que esta línea esté al principio del archivo para Gesture Handler
import 'react-native-gesture-handler';
import React from 'react';
import { Stack } from 'expo-router';
// Importa PaperProvider y DefaultTheme de React Native Paper
import { PaperProvider, DefaultTheme } from 'react-native-paper';

// Define tu tema personalizado para React Native Paper
// Puedes ajustar los colores y otras propiedades a tu gusto
const theme = {
  ...DefaultTheme, // Extiende el tema por defecto de Paper
  colors: {
    ...DefaultTheme.colors, // Mantén los colores por defecto y sobrescribe los que quieras
    primary: '#007bff',    // Un color azul principal para botones, etc.
    accent: '#28a745',     // Un color verde para elementos secundarios o de acción
    background: '#f8f8f8', // Color de fondo general de las pantallas
    text: '#333333',       // Color del texto principal
    // Otros colores que podrías necesitar:
    // error: '#dc3545',
    // surface: '#ffffff',
  },
  // Opcional: Puedes personalizar la tipografía, animaciones, etc. aquí
  // fonts: configureFonts({
  //   web: {
  //     regular: {
  //       fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  //       fontWeight: 'normal',
  //     },
  //   },
  //   ios: {
  //     regular: {
  //       fontFamily: 'System',
  //       fontWeight: 'normal',
  //     },
  //   },
  //   android: {
  //     regular: {
  //       fontFamily: 'Roboto',
  //       fontWeight: 'normal',
  //     },
  //   },
  // }),
};

export default function RootLayout() {
  return (
    // PaperProvider debe envolver a Stack para que todas las pantallas accedan al tema
    <PaperProvider theme={theme}>
      <Stack>
        {/* Aquí defines todas las rutas de tu aplicación */}

        {/* Pantalla de Login/Splash - generalmente sin cabecera */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Pantalla de selección de rol */}
        <Stack.Screen name="role-selection" options={{ headerShown: false, title: 'Seleccionar Tipo de Usuario' }}/>

        {/* Pantallas de registro/onboarding para cada tipo de usuario */}
        <Stack.Screen name="client-onboarding" options={{ title: 'Datos de Cliente' }} />
        <Stack.Screen name="professional-onboarding" options={{ headerShown: false, title: 'Crea tu Perfil Profesional' }} />

        {/* Dashboards para clientes y profesionales (pueden tener su propio layout de tabs) */}
        {/* Por ahora, headerShown: false si su _layout.tsx interno maneja la cabecera/tabs */}
        <Stack.Screen name="client-dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="profesional/primer-ingreso/seller" options={{ headerShown: false }} />

        <Stack.Screen name="(cliente)" options={{ headerShown: false }} />
        <Stack.Screen name="professional-dashboard" options={{ headerShown: false }} />
        {/* Si tienes un grupo de rutas para la app principal (ej. tus pestañas),
            lo defines así, y su propio _layout.tsx dentro de (app) manejará sus tabs. */}
        {/* <Stack.Screen name="(app)" options={{ headerShown: false }} /> */}

        {/* Otras rutas que puedas agregar más adelante */}
        {/* <Stack.Screen name="(client)/professional-profile/[id]" options={{ title: 'Perfil Profesional' }} /> */}
      </Stack>
    </PaperProvider>
  );
}