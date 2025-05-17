// src/app/(client)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { router } from 'expo-router'; // Para la navegación

export default function ClientProfileScreen() {
  const theme = useTheme();

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    // 1. Eliminar el token y el rol de SecureStore
    // 2. Redirigir al usuario a la pantalla de login (index.tsx)
    //router.replace('/index'); // Esto es temporal, se conectará con la lógica de logout real
    console.log('Cerrar sesión (funcionalidad pendiente)');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Mi Perfil de Cliente</Text>
      <Text style={styles.infoText}>Aquí podrás ver y editar tus datos, historial de servicios, etc.</Text>
      {/* Contenido del perfil del cliente */}

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      >
        Cerrar Sesión
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 40,
    borderColor: '#dc3545', // Color de error/peligro
  },
  logoutButtonText: {
    color: '#dc3545',
  },
});