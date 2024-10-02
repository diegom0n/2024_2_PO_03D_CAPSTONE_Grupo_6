//En la prueba, se renderiza el componente NewCarScreen y luego se verifica si el texto 'Agregar Vehículo' está presente en el componente renderizado.
// Si el texto está presente, la prueba pasa. Si no, la prueba falla.
import { render } from '@testing-library/react-native';
import NewCarScreen from '../../cliente/screens/NewCarScreen';

describe('NewCarScreen', () => {
  it('se renderiza correctamente', () => {
    const { getByText } = render(<NewCarScreen />);
    expect(getByText('Agregar Vehículo')).toBeTruthy();
  });
});