import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ParkingListScreen from '../../cliente/screens/ParkingListScreen';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { db } from '../Components/config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { NavigationContainer } from '@react-navigation/native';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn().mockReturnValue({}),
  }));
  
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    getFirestore: jest.fn().mockReturnValue({}),
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn().mockReturnValue({}),
  }));

describe('ParkingListScreen', () => {
    it('se renderiza correctamente', () => {
        const { getByText } = render(
          <NavigationContainer>
            <ParkingListScreen />
          </NavigationContainer>
        );
        expect(getByText('Lista de Estacionamientos')).toBeTruthy();
      });

      it('llama a obtenerEstacionamientos al montar', async () => {
        getDocs.mockResolvedValueOnce({
          forEach: jest.fn(),
        });
        render(
            <NavigationContainer>
              <ParkingListScreen />
            </NavigationContainer>
          );


          await waitFor(() => {
            expect(getDocs).toHaveBeenCalledWith(collection(db, 'estacionamiento'));
          });
        });


  // Aquí puedes agregar más pruebas
});
