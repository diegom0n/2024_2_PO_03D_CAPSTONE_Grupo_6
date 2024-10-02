import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';


const openMaps = () => {
  const latitude =-33.493553; // Latitud de la dirección del estacionamiento
  const longitude =-70.682161; // Longitud de la dirección del estacionamiento
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  Linking.openURL(url);
};

const PaymentSuccessfulScreen = ({ route }) => {

  const {selectedPaymentMethod,selectedParkingTime,price} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pago Exitoso!</Text>
      <Text style={styles.subtitle}>Detalles del arriendo:</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tiempo de estacionamiento:</Text>
          <Text style={styles.detailValue}> {selectedParkingTime} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Método de pago:</Text>
          <Text style={styles.detailValue}>{selectedPaymentMethod}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Monto pagado:</Text>
          <Text style={styles.detailValue}>${price*100}</Text>
        </View>
      </View>
        <TouchableOpacity style={styles.button} onPress={openMaps}>
            <Text style={styles.buttonText}>Ir a la dirección del estacionamiento</Text>
       </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171a21',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c7d5e0',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c7d5e0',
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#1b2838',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#c7d5e0',
  },
  detailValue: {
    fontSize: 16,
    color: '#c7d5e0',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#66c0f4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c7d5e0',
  },
});

export default PaymentSuccessfulScreen;
