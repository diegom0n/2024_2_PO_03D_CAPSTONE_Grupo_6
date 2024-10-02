import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// Ajusta la ruta según tu estructura de proyecto
import { View, TextInput } from 'react-native';
import SearchBar from '../Components/SearchBar';


// Mock para react-native-google-places-autocomplete
jest.mock('react-native-google-places-autocomplete', () => {
    const React = require('react');
    const { View, TextInput } = require('react-native');
  
    return {
      GooglePlacesAutocomplete: jest.fn().mockImplementation(({ placeholder, onPress }) => {
        return (
          <View>
            <TextInput 
              placeholder={placeholder} 
              onChangeText={(text) => onPress({ description: text }, { geometry: { location: {} } })}
            />
          </View>
        );
      }),
    };
  });

// Mock para @react-navigation/native
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockImplementation(() => ({
      navigate: mockNavigate,
    })),
  };
});

const mockStore = configureStore([]);
const store = mockStore({
  nav: {
    origin: null,
    destination: null,
  },
});

describe('SearchBar Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(getByPlaceholderText('Donde estas?')).toBeTruthy();
  });

  it('triggers search button press', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = getByPlaceholderText('Donde estas?');
    fireEvent.changeText(input, 'Test Location');
    fireEvent.press(getByRole('button'));

    // Añade las aserciones según el comportamiento esperado
  });
  
  it('navigates to MapScreen on search button press', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  
    const input = getByPlaceholderText('Donde estas?');
    fireEvent.changeText(input, 'Test Location');
    fireEvent.press(getByRole('button'));
  
    expect(mockNavigate).toHaveBeenCalledWith('MapScreen');
  });
});