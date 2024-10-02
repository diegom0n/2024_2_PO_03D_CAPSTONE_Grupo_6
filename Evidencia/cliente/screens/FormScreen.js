import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image, Alert } from 'react-native';

import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Components/config';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';

export default function App() {
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dimensionesAncho, setDimensionesAncho] = useState('');
  const [dimensionesLargo, setDimensionesLargo] = useState('');
  const [numVehiculos, setNumVehiculos] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function create() {
    if (
      !nombre ||
      !direccion ||
      !telefono ||
      !dimensionesAncho ||
      !dimensionesLargo ||
      !numVehiculos
    ) {
      alert('Ingrese los datos correctamente');
      return;
    }

    const camposDisponibles = crearCamposDisponibles();
    const estacionamientoData = {
      userId: userId,
      nombre: nombre,
      direccion: direccion,
      latitude: latitude,
      longitude: longitude,
      telefono: telefono,
      dimensiones: {
        ancho: dimensionesAncho,
        largo: dimensionesLargo,
      },
      espacios: camposDisponibles,
    };

    addDoc(collection(db, 'estacionamiento'), estacionamientoData)
      .then((docRef) => {
        const estacionamientoId = docRef.id;
        estacionamientoData.estacionamientoId = estacionamientoId;

        setDoc(doc(db, 'estacionamiento', estacionamientoId), estacionamientoData)
          .then(() => {
            Alert.alert('Éxito', 'Datos registrados con éxito!!');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function crearCamposDisponibles() {
    const camposDisponibles = [];
    for (let i = 0; i < parseInt(numVehiculos); i++) {
      camposDisponibles.push(true);
    }
    return camposDisponibles;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Estacionamiento</Text>

      <View style={styles.direccionContainer}>
        <GooglePlacesAutocomplete
          placeholder="Dirección"
          onPress={(data, details = null) => {
            setDireccion(data.description);
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.input,
          }}
        />
      </View>

      <TextInput
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Nombre del estacionamiento"
        style={styles.input}
      />

      <TextInput
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
        placeholder="Teléfono"
        style={styles.input}
      />

      <View style={styles.dimensionesContainer}>
        <TextInput
          value={dimensionesAncho}
          onChangeText={(text) => setDimensionesAncho(text)}
          placeholder="Ancho (metros)"
          style={[styles.input, styles.dimensionesInput]}
        />

        <TextInput
          value={dimensionesLargo}
          onChangeText={(text) => setDimensionesLargo(text)}
          placeholder="Largo (metros)"
          style={[styles.input, styles.dimensionesInput]}
        />
      </View>

      <TextInput
        value={numVehiculos}
        onChangeText={(text) => setNumVehiculos(text)}
        placeholder="Número de vehículos"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={create} title="Guardar" />
      <StatusBar style="auto" />

      <Image source={require('../assets/logoparkin.png')} style={styles.logo} />
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
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66c0f4',
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#66c0f4',
  },
  dimensionesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionesInput: {
    flex: 1,
    marginHorizontal: 3,
  },
  direccionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  autocompleteContainer: {
    position: 'relative',
    width: '100%',
  },
});
