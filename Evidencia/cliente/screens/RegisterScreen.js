import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Text, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Components/config';

export default function App() {
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setrut] = useState('');

  const usuarioData = {
    userId: userId,
    nombre: nombre,
    apellido: apellido,
    numero: numero,
    email: email,
    rut: rut
  };
  
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
    if (!nombre || !apellido || !numero || !email || !rut ) {
      alert('Ingrese los datos correctamente');
      return;
    }

    addDoc(collection(db, 'autos'), usuarioData)
    .then((docRef) => {
      const usuarioId = docRef.id;
      usuarioData.usuarioId = usuarioId;

      setDoc(doc(db, 'usuarios', usuarioId), usuarioData)
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>Ingrese sus datos para quedar registrado en el sistema</Text>

      <TextInput
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        placeholder="Nombre"
        style={styles.input}
      />

      <TextInput
        value={apellido}
        onChangeText={(text) => setApellido(text)}
        placeholder="Apellido"
        style={styles.input}
      />

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        style={styles.input}
      />

      <TextInput
        value={rut}
        onChangeText={(text) => setrut(text)}
        placeholder="Rut"
        style={styles.input}
      />
      
      <TextInput
        value={numero}
        onChangeText={(text) => setNumero(text)}
        placeholder="Telefono"
        style={styles.input}
      />

      

      <Button onPress={create} title="Subir datos" />

      <StatusBar style="auto" />

      <Image source={require('../assets/logore.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b2838', // Fondo negro
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#66c0f4', // Texto en blanco
    marginBottom: 20,
  },
  subtitle: {
    color: '#66c0f4',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#66c0f4',
    color: '#ffffff',
  },
  button: {
    borderRadius: 100,
    color: 'blue',
    alignItems: 'center',
    width: 350,
    paddingVertical: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    color: 'blue',
  }
});
