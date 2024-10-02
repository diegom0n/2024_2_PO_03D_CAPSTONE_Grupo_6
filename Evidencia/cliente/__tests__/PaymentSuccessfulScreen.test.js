import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentSuccessfulScreen from '../../cliente/screens/PaymentSuccessfulScreen';

// Mock de la función Linking.openURL
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('PaymentSuccessfulScreen', () => {
  test('muestra el mensaje de "Pago exitoso"', () => {
    const { getByText } = render(<PaymentSuccessfulScreen route={{ params: {} }} />);
    
    // Verificar que se muestra el mensaje de "Pago exitoso"
    expect(getByText('¡Pago Exitoso!')).toBeTruthy();
  });

  test('abre el enlace de Google Maps al presionar el botón', () => {
    const { getByText } = render(<PaymentSuccessfulScreen route={{ params: {} }} />);
    
    // Simular el evento de presionar el botón
    fireEvent.press(getByText('Ir a la dirección del estacionamiento'));

    // Verificar que la función Linking.openURL fue llamada con el enlace de Google Maps
    expect(require('react-native/Libraries/Linking/Linking').openURL).toHaveBeenCalledWith(expect.stringContaining('https://www.google.com/maps'));
  });
});