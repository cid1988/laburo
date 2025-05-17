// src/app/professional-onboarding.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
// Asegúrate de que las importaciones de Paper estén correctas y completas:
import { TextInput, Button, useTheme, Dialog, Portal, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';

const serviceCategories = [
  'Pintor', 'Electricista', 'Plomero', 'Jardinero', 'Albañil',
  'Carpintero', 'Mecánico', 'Limpieza', 'Diseñador Web', 'Fotógrafo',
  'Entrenador Personal', 'Masajista', 'Reparación de Celulares', 'Otros'
];

export default function Page() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false); // Estado para controlar la visibilidad del diálogo

  const theme = useTheme();
  const router = useRouter();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const handleSubmit = () => {
    if (!businessName || !location || selectedCategories.length === 0 || !description) {
      Alert.alert('Error', 'Por favor, completa al menos los campos principales.');
      return;
    }

    Alert.alert(
      '¡Registro Profesional Exitoso!',
      'Tu perfil ha sido creado.',
      [{
        text: 'OK',
        onPress: () => {
          router.replace('/');
        },
      }]
    );
  };

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

      {/* Campo de Categorías - ahora con un TextInput que abre un diálogo */}
      <TouchableOpacity onPress={showDialog} style={styles.inputTouchArea}>
        <TextInput
          label="Actividad(es) Principal(es)"
          value={selectedCategories.length > 0 ? selectedCategories.join(', ') : ''}
          mode="outlined"
          style={styles.input}
          editable={false} // No editable directamente, solo se abre con el toque
          right={<TextInput.Icon icon="chevron-down" />} // Un ícono para indicar que es un selector
        />
      </TouchableOpacity>

      {/* Diálogo para seleccionar múltiples categorías */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Selecciona tus Actividades</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{ maxHeight: 200 }}> {/* Limita la altura del scroll */}
              {serviceCategories.map(category => (
                <View key={category} style={styles.checkboxContainer}>
                  <Checkbox
                    status={selectedCategories.includes(category) ? 'checked' : 'unchecked'}
                    onPress={() => handleCategoryToggle(category)}
                  />
                  <Text style={styles.checkboxLabel}>{category}</Text>
                </View>
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
  inputTouchArea: { // Para que el TextInput se pueda tocar y abra el diálogo
    width: '100%',
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
  categoriesContainer: { // Esto ya no es necesario si usas el diálogo con checkboxes
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
  // Estilos para los checkboxes en el diálogo
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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