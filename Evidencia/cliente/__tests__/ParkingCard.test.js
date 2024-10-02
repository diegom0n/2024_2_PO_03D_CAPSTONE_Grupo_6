//Lo que hace esta prueba es simular una situación en la que no hay información seleccionada para mostrar en el ParkingCard. 
//En la aplicación real, esto podría suceder, por ejemplo, si el usuario aún no ha seleccionado un lugar de estacionamiento.
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ParkingCard from '../../cliente/Components/ParkingCard';

const mockStore = configureStore([]);

describe('ParkingCard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      nav: { selectedMarker: null },
    });
  });

  it('no se renderiza si selectedMarker es nulo', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <ParkingCard />
      </Provider>
    );
    expect(queryByTestId('parking-card')).toBeNull();
  });
});