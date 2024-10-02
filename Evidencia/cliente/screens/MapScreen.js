import React from "react";
import { View,StyleSheet,TouchableOpacity,Text } from "react-native";
import Map from "../Components/Map";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";
import ParkingCard from "../Components/ParkingCard";
import { useNavigation } from '@react-navigation/native';
const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`h-full w-full`}>
        <Map />
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
      </View>
    </View>
  );
}

export default MapScreen;
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