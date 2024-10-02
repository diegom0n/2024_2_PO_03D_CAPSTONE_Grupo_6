import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Map from '../Components/Map';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

require('dotenv').config();
jest.mock('@react-navigation/native');
jest.mock('axios');

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

describe('Map Component', () => {
  let store;

  beforeEach(() => {

    store = mockStore({
      nav: {
        origin: { location: { lat: 0, lng: 0 } },
        selectedMarker: null,
      },
    });

    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const mockResponse = {
      data: [
        {
          id: '1',
          latitude: 37.78825,
          longitude: -122.4324,
          nombre: 'Parking 1',
          description: 'Description 1',
          espacios: { 1: true, 2: false },
        },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);


  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch markers and display them on the map', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
  
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://192.168.1.13:3000/estacionamientos');
    });
  
    expect(getByTestId('marker-0')).toBeTruthy();
  });
  
  it('should display floating bar when a marker is pressed', async () => {
    const { findByTestId, queryByTestId } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
  
    const marker = await findByTestId('marker-0');
    fireEvent.press(marker);
  
    await waitFor(() => {
      expect(queryByTestId('floating-bar')).not.toBeNull();
    });
  });
});