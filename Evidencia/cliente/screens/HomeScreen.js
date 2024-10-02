import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import SearchBar from '../Components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { IP } from '@env';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SpotFinder</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <SearchBar />
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate('NewCarScreen')} style={[styles.button1, { backgroundColor: '#66c0f4' }]}>
          <View style={{marginTop:15}}>
            <Image
              style={styles.buttonImage}
              source={{ uri: 'https://links.papareact.com/3pn' }}
            />
          </View>
          <View>
           <Text style={styles.buttonText}>Patente: SW-WS-23</Text>
           <Text style={styles.buttonText}>Modelo: Kia cerato</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParkingListScreen')}
          style={[styles.button, { backgroundColor: '#66c0f4' }]}
        >
          <View>
            <Image
              style={styles.buttonImage}
              source={{ uri: 'https://links.papareact.com/3pn' }}
            />
            <Text style={styles.buttonText}>Mis Estacionamientos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button2, { backgroundColor: '#66c0f4' }]}>
           <View style={{ marginLeft: 7 }}>
              <Image
                style={{
                  borderRadius: 15,
                  width: 125,
                  height: 125,
                }}
                source={require('../assets/Estacionamiento.png')}
              />
            </View>
            <View>
              <Text> Direccion: Francisco bilbao</Text>
              <Text> Precio: $1000</Text>
              <Text> Fecha: 03/05/20</Text>
              <Text> Hora: 13:30</Text>
            </View>
                
        </TouchableOpacity>
        
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={[styles.bottomBarButton, { backgroundColor: '#2a475e' }]}
        >
          <FontAwesome5 name="home" size={24} color="black" />
          <Text style={styles.bottomBarButtonText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={[styles.bottomBarButton, { backgroundColor: '#2a475e' }]}
        >
          <Ionicons name="person-circle-sharp" size={24} color="black" />
          <Text style={styles.bottomBarButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 52,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  body: {
    marginTop: 300,
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  button1: {
    width: 160,
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    
  },
  button2: {
    width: 340,
    height: 160,
    justifyContent:'space-evenly' ,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    flexDirection:'row'
    
  },
  buttonImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  buttonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#2a475e',
  },
  bottomBarButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a475e',
  },
  bottomBarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#171a21',
  },
});
