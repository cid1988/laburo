// src/app/(cliente)/search.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- Datos simulados de profesionales (¡reemplazar con datos de tu backend!) ---
interface Professional {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
}

const DUMMY_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    category: 'Pintor',
    description: 'Pintor con 15 años de experiencia en interiores y exteriores.',
    rating: 4.8,
    reviewsCount: 120,
    imageUrl: 'https://via.placeholder.com/80/007bff/FFFFFF?text=JP', // Placeholder azul
  },
  {
    id: '2',
    name: 'María García',
    category: 'Electricista',
    description: 'Electricista matriculada, reparaciones e instalaciones seguras.',
    rating: 4.9,
    reviewsCount: 95,
    imageUrl: 'https://via.placeholder.com/80/28a745/FFFFFF?text=MG', // Placeholder verde
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    category: 'Plomero',
    description: 'Soluciones rápidas para fugas, instalaciones de baños y cocinas.',
    rating: 4.5,
    reviewsCount: 78,
    imageUrl: 'https://via.placeholder.com/80/ffc107/333333?text=CR', // Placeholder amarillo
  },
  {
    id: '4',
    name: 'Ana López',
    category: 'Jardinero',
    description: 'Diseño y mantenimiento de jardines, poda y paisajismo profesional.',
    rating: 4.7,
    reviewsCount: 60,
    imageUrl: 'https://via.placeholder.com/80/17a2b8/FFFFFF?text=AL', // Placeholder celeste
  },
  {
    id: '5',
    name: 'Pedro Gómez',
    category: 'Albañil',
    description: 'Reformas y construcción de calidad, experiencia en todo tipo de obras.',
    rating: 4.6,
    reviewsCount: 150,
    imageUrl: 'https://via.placeholder.com/80/6c757d/FFFFFF?text=PG', // Placeholder gris
  },
];
// --------------------------------------------------------------------------

export default function ClientSearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams(); // Esto obtiene los query params (q, category)
  
  const initialSearchQuery = typeof params.q === 'string' ? params.q : '';
  const initialCategoryFilter = typeof params.category === 'string' ? params.category : '';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para filtrar profesionales (simulada)
  const filterProfessionals = (query: string, category: string) => {
    setLoading(true); // Activa el loading
    // Simula una llamada a la API
    setTimeout(() => {
      let results = DUMMY_PROFESSIONALS;

      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        results = results.filter(
          (prof) =>
            prof.name.toLowerCase().includes(lowerCaseQuery) ||
            prof.description.toLowerCase().includes(lowerCaseQuery) ||
            prof.category.toLowerCase().includes(lowerCaseQuery)
        );
      }

      if (category) {
        const lowerCaseCategory = category.toLowerCase();
        results = results.filter(
          (prof) => prof.category.toLowerCase() === lowerCaseCategory
        );
      }
      setFilteredProfessionals(results);
      setLoading(false); // Desactiva el loading
    }, 800); // Simula un retraso de red
  };

  // Efecto para cargar los profesionales al inicio o cuando cambian los params
  useEffect(() => {
    filterProfessionals(initialSearchQuery, initialCategoryFilter);
  }, [initialSearchQuery, initialCategoryFilter]); // Se re-ejecuta si cambian los params

  // Función para manejar la búsqueda manual desde el TextInput
  const handleManualSearch = () => {
    filterProfessionals(searchQuery, ''); // Limpiamos la categoría si hay búsqueda manual
  };

  // Función para navegar al perfil del profesional
  const handleViewProfile = (professionalId: string) => {
    //Alert.alert('Ver Perfil', `Navegar al perfil de ${professionalId}. (Funcionalidad futura)`);
    // En el futuro: router.push(`/professional-profile/${professionalId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Barra de Búsqueda Refinada */}
      <TextInput
        label="Refinar búsqueda"
        value={searchQuery}
        onChangeText={setSearchQuery}
        mode="outlined"
        style={styles.searchInput}
        right={
          <TextInput.Icon
            icon="magnify"
            onPress={handleManualSearch}
            color={theme.colors.primary}
          />
        }
        onSubmitEditing={handleManualSearch}
      />

      <ScrollView style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
            
          </View>
        ) : filteredProfessionals.length > 0 ? (
          filteredProfessionals.map((professional) => (
            <Card key={professional.id} style={styles.professionalCard}>
              <View style={styles.cardContent}>
                <Image source={{ uri: professional.imageUrl }} style={styles.profileImage} />
                <View style={styles.textContainer}>
                  <Title style={styles.professionalName}>{professional.name}</Title>
                  <Text style={styles.professionalCategory}>{professional.category}</Text>
                  <Paragraph numberOfLines={2} ellipsizeMode="tail" style={styles.professionalDescription}>
                    {professional.description}
                  </Paragraph>
                  <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons name="star" size={18} color="#FFD700" />
                    <Text style={styles.ratingText}>
                      {professional.rating.toFixed(1)} ({professional.reviewsCount} reseñas)
                    </Text>
                  </View>
                </View>
              </View>
              <Card.Actions style={styles.cardActions}>
                <Button onPress={() => handleViewProfile(professional.id)}>Ver Perfil</Button>
                <Button mode="contained" onPress={() => Alert.alert('Contactar', `Contactar a ${professional.name}. (Funcionalidad futura)`)}>
                  Contactar
                </Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text style={styles.noResultsText}>No se encontraron profesionales con esos criterios.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    marginBottom: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  professionalCard: {
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Para hacerla circular
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  professionalCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  professionalDescription: {
    fontSize: 14,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});