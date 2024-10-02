import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setOrigin, setDestination } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Entypo } from '@expo/vector-icons'; // Importar el ícono de la lupa
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSearch = (data, details = null) => {
    setSelectedPlace(details);
  };

  const handleSearchButtonPress = () => {
    if (selectedPlace) {
      dispatch(
        setOrigin({
          location: selectedPlace.geometry.location,
          description: selectedPlace.description,
        })
      );
      dispatch(setDestination(null));
      navigation.navigate('MapScreen');
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        placeholder="Donde estas?"
        onPress={handleSearch}
        fetchDetails={true}
        returnKeyType={'search'}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        styles={autoCompleteStyles} // Estilos personalizados para el componente de autocompletar
      />
      <TouchableOpacity  onPress={handleSearchButtonPress} style={styles.searchButton} accessibilityRole="button">
        <Entypo name="magnifying-glass" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const autoCompleteStyles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    fontSize: 16,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  listView: {
    position: 'absolute',
    top: 55,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    elevation: 5,
  },
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
  },
});

export default SearchBar;
