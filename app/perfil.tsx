// src/app/buyer.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Aunque no navegaremos en este ejemplo, es buena práctica tenerlo si el componente podría hacerlo.

export default function Page() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // No necesitamos useRouter si no hay navegación desde esta pantalla por ahora,
  // pero lo dejamos como recordatorio si se agregara un botón de "volver" o "finalizar" que navegue.
  // const router = useRouter(); 

  const handleSubmit = () => {
    // Aquí puedes agregar validaciones más robustas si lo necesitas.
    if (!name || !address || !phone) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    Alert.alert(
      'Datos de Comprador Guardados',
      `Nombre: ${name}\nDirección: ${address}\nTeléfono: ${phone}`,
      [{ text: 'OK' }]
    );
    // En una app real, enviarías estos datos a un backend:
    // console.log({ name, address, phone });

    // Después de guardar, podrías redirigir al usuario, por ejemplo, a una pantalla de inicio:
    // router.replace('/'); // Redirige a la ruta principal, reemplazando la pantalla actual en el historial.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Dirección de Envío"
        placeholderTextColor="#666"
        value={address}
        onChangeText={setAddress}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      
      {/* Puedes añadir más campos específicos para el comprador aquí */}
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Datos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenido sea desplazable si excede la altura
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Un fondo suave
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // Color de texto oscuro
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff', // Fondo blanco para el input
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd', // Borde ligero
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff', // Un azul vibrante para el botón
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000', // Sombra para un efecto 3D
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff', // Texto blanco en el botón
    fontSize: 18,
    fontWeight: 'bold',
  },
});