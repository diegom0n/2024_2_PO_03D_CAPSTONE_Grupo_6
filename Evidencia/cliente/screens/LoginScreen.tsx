import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
     
      navigation.navigate('HomeScreen');
    } catch (error: any) {
      console.log(error);
      alert('Hubo un error en el registro' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
   

      const user = response.user;
      const userData = {
        uid: user.uid,
        email: user.email,
       
      };

      const usuariosCollectionRef = collection(FIRESTORE_DB, 'usuario');
      await addDoc(usuariosCollectionRef, userData);

      alert('Cuenta creada con éxito');
    } catch (error: any) {
      console.log(error);
      alert('Hubo un error en el registro' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resertPassword = () => {
    if (email != null) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Revise su correo electrónico");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Por favor, ingrese un correo electrónico válido");
        });
    } else {
      alert("Por favor, ingrese un correo electrónico válido");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry // Agregado para poner el input en modo password
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Crear cuenta" onPress={() => navigation.navigate('RegisterScreen')} />
          <Button title="Olvidaste tu contraseña?" onPress={resertPassword} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b2838', // Fondo negro
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ffffff', // Texto en blanco
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#eef5ff', // Texto en blanco
    marginBottom: 20,
  },
  input: {
    marginVertical: 4,
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

export default Login;
