import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Components/config';
import { useNavigation } from '@react-navigation/native';

export default function ListaEstacionamientos() {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerEstacionamientos();
  }, []);

  async function obtenerEstacionamientos() {
    try {
      const querySnapshot = await getDocs(collection(db, 'estacionamiento'));
      const estacionamientosData = [];
      querySnapshot.forEach((doc) => {
        const estacionamiento = doc.data();
        estacionamiento.id = doc.id;
        estacionamientosData.push(estacionamiento);
      });
      setEstacionamientos(estacionamientosData);
    } catch (error) {
      console.log(error);
    }
  }

  function verDetallesEstacionamiento(estacionamiento) {
    setEstacionamientoSeleccionado(estacionamiento);
  }

  function renderTarjetaEstacionamiento({ item }) {
    return (
      <TouchableOpacity
        style={styles.tarjeta}
        onPress={() => verDetallesEstacionamiento(item)}
      >
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.direccion}>{item.direccion}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Estacionamientos</Text>
      
      {/* Botón para ir a FormScreen */}
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('FormScreen')}
      >
        <Text style={styles.botonTexto}>Ir a FormScreen</Text>
      </TouchableOpacity>

      <FlatList
        data={estacionamientos}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjetaEstacionamiento}
      />

      {estacionamientoSeleccionado && (
        <View style={styles.detallesContainer}>
          <Text style={styles.detallesTitulo}>{estacionamientoSeleccionado.nombre}</Text>
          <Text style={styles.detallesTexto}>Dirección: {estacionamientoSeleccionado.direccion}</Text>
          <Text style={styles.detallesTexto}>Teléfono: {estacionamientoSeleccionado.telefono}</Text>
          <Text style={styles.detallesTexto}>Dimensiones (Ancho x Largo): {estacionamientoSeleccionado.dimensiones.ancho} x {estacionamientoSeleccionado.dimensiones.largo}</Text>
          {/* Aquí puedes mostrar más detalles del estacionamiento */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b2838',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66c0f4',
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#66c0f4',
    padding: 20,
    marginVertical: 10,
    borderRadius: 4,
    width: '100%',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b2838',
  },
  direccion: {
    fontSize: 16,
    color: '#1b2838',
  },
  detallesContainer: {
    backgroundColor: '#66c0f4',
    padding: 20,
    marginTop: 20,
    borderRadius: 4,
    width: '100%',
  },
  detallesTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b2838',
    marginBottom: 10,
  },
  detallesTexto: {
    fontSize: 16,
    color: '#1b2838',
    marginBottom: 5,
  },
  boton: {
    backgroundColor: '#66c0f4',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  botonTexto: {
    color: '#1b2838',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
