// src/app/(client)/home.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme, Card, Title, Paragraph } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Algunas categorías populares para mostrar
const popularCategories = [
  { name: 'Pintor', icon: 'format-paint' },
  { name: 'Electricista', icon: 'power-plug' },
  { name: 'Plomero', icon: 'pipe-wrench' },
  { name: 'Jardinero', icon: 'flower-outline' },
  { name: 'Limpieza', icon: 'broom' },
  { name: 'Mecánico', icon: 'car-repair' },
];

export default function ClientHomeDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Búsqueda', 'Por favor, ingresa algo para buscar.');
      return;
    }
    // Redirige a la pantalla de búsqueda con el término de búsqueda
    //router.push(`/search?q=${searchQuery.trim()}`); // Pasamos el query param 'q'
  };

  const handleCategoryPress = (categoryName: string) => {
    // Redirige a la pantalla de búsqueda con la categoría preseleccionada
    router.push(`/(cliente)/search?category=${categoryName}`);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.greeting}>¡Hola, ¿Qué necesitas hoy?!</Text>

      {/* Barra de Búsqueda */}
      <TextInput
        label="Buscar un servicio o profesional..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        mode="outlined"
        style={styles.searchInput}
        right={
          <TextInput.Icon
            icon="magnify"
            onPress={handleSearch}
            color={theme.colors.primary}
          />
        }
        onSubmitEditing={handleSearch} // Permite buscar al presionar Enter en el teclado
      />

      {/* Sección de Categorías Populares */}
      <Text style={styles.sectionTitle}>Categorías Populares</Text>
      <View style={styles.categoriesGrid}>
        {popularCategories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <MaterialCommunityIcons name={category.icon as any} size={40} color={theme.colors.primary} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección de Servicios Destacados (ej. tarjetas de profesionales) */}
      <Text style={styles.sectionTitle}>Profesionales Destacados</Text>
      <Card style={styles.featuredCard}>
        <Card.Content>
          <Title>Juan Pérez - Electricista</Title>
          <Paragraph>Experto en instalaciones y reparaciones eléctricas. Disponible hoy.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => Alert.alert('Ver Perfil', 'Funcionalidad futura.')}>Ver Perfil</Button>
          <Button onPress={() => Alert.alert('Solicitar', 'Funcionalidad futura.')}>Solicitar</Button>
        </Card.Actions>
      </Card>
      {/* Puedes agregar más tarjetas de profesionales destacados aquí */}

      {/* Botón para explorar más servicios */}
      <Button
        mode="contained"
        //onPress={() => router.push('/search')} // Redirige a la pantalla de búsqueda completa
        style={styles.exploreButton}
        labelStyle={styles.exploreButtonText}
      >
        Explorar Todos los Servicios
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchInput: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    marginTop: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  categoryCard: {
    width: '45%', // Aproximadamente la mitad del ancho para 2 columnas
    aspectRatio: 1, // Para que sea un cuadrado
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  featuredCard: {
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  exploreButton: {
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  exploreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});