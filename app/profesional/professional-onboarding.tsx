import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Podrías tener una lista de categorías predefinidas
const serviceCategories = ['Pintor', 'Electricista', 'Plomero', 'Jardinero', 'Albañil', 'Carpintero', 'Mecánico', 'Limpieza', 'Otros'];

export default function Page() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Para múltiples categorías
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!businessName || !location || selectedCategories.length === 0 || !description) {
      Alert.alert('Error', 'Por favor, completa al menos los campos principales.');
      return;
    }

    Alert.alert(
      'Datos de Profesional Guardados',
      `Negocio: ${businessName}\nUbicación: ${location}\nCategorías: ${selectedCategories.join(', ')}\nDescripción: ${description}\nTeléfono: ${phone}\nEmail: ${email}`,
      [{ text: 'OK' }]
    );
    // En una app real, enviarías estos datos a tu API para crear o actualizar el perfil del profesional.
    // router.replace('/professional-dashboard'); // O a la ruta de dashboard del profesional
  };

  // Componente Dummy para subir imágenes (se reemplazará con una librería real)
  const ImageUploadPlaceholder = () => (
    <View style={styles.imageUploadArea}>
      <Text style={styles.imageUploadText}>+ Subir Fotos de Trabajos</Text>
      <Text style={{color: '#999', fontSize: 12}}> (Funcionalidad real se implementará después) </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Crea tu Perfil de Profesional</Text>

      <TextInput
        label="Nombre de tu Negocio/Profesional"
        value={businessName}
        onChangeText={setBusinessName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Ubicación de Trabajo (Ciudad/Barrio)"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Selecciona tus Actividades:</Text>
      <View style={styles.categoriesContainer}>
        {serviceCategories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => handleCategoryToggle(category)}
          >
            <Text style={[styles.categoryButtonText, selectedCategories.includes(category) && { color: '#fff' }]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        label="Descripción de tus Servicios (máx. 200 caracteres)"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        maxLength={200}
        style={[styles.input, { height: 100 }]}
      />

      <TextInput
        label="Número de Teléfono de Contacto"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Email de Contacto"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Tus Trabajos Realizados:</Text>
      <ImageUploadPlaceholder />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Crear Mi Perfil
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: '#eee',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  imageUploadArea: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});