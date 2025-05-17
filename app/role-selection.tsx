// src/app/role-selection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // ¡Importante para Expo Router!

export default function Page() { // 'Page' es la convención para componentes de ruta en Expo Router
  const router = useRouter(); // Inicializa el hook para navegar

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué tipo de usuario eres?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/buyer')} // Navega a la ruta 'buyer'
      >
        <Text style={styles.buttonText}>Busco Servicios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.sellerButton]}
          onPress={() => router.push('/profesional/primer-ingreso/seller')} // Navega a la ruta 'seller'
        >
        <Text style={styles.buttonText}>Ofrezco Servicios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: '#28a745', // Un color verde para el botón de comprador
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sellerButton: {
    backgroundColor: '#ffc107', // Un color naranja/amarillo para el botón de vendedor
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});