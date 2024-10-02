import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>Nombre del Usuario</Text>
        <Text style={styles.email}>correo@example.com</Text>
        <Text style={styles.bio}>Descripción del usuario Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        {/* Otros detalles del perfil */}
      </View>
      {/* Otras secciones de la pantalla de perfil */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2a475e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#171a21',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c7d5e0',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#c7d5e0',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#c7d5e0',
    marginBottom: 20,
  },
});

export default ProfileScreen;
