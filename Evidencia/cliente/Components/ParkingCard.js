import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSelectedMarker } from '../slices/navSlice';

const ParkingCard = () => {
  const selectedMarker = useSelector(selectSelectedMarker);

  if (!selectedMarker) {
    return null; 
  }

  return (
    <View style={styles.parking}>
      <View>
      <Text>{selectedMarker.direccion}</Text>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    parking:{
        backgroundColor:'white',
        borderRadius:6,
        padding:24,
        marginHorizontal:24,
    }
  })

export default ParkingCard;

