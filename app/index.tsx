import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter

export default function Page() { // Cambiado a Page para Expo Router
const [email, setEmail] = useState('');
const router = useRouter(); // Inicializa el hook

const handleLogin = () => {
    if (email) {
        // En una app real, aquí harías la validación del email y la autenticación.
        // Por ahora, solo navegamos a la siguiente pantalla usando router.push()
        router.push('/role-selection'); // Navega a la ruta 'role-selection'
    } else {
        Alert.alert('Error', 'Por favor, ingresa tu email.');
    }
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});