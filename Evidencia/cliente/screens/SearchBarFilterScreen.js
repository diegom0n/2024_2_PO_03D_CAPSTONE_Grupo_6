import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
const SearchBarFilterScreen = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      const { locationX } = event.nativeEvent;
      const containerWidth = 300; // Define the width of your container
      const minValue = 0;
      const maxValue = 100;
      const newValue = (locationX / containerWidth) * (maxValue - minValue);
      const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));
      const roundedValue = Number(clampedValue.toFixed(0)); // Round to 0 decimal places
      setPriceRange([roundedValue, priceRange[1]]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceRangeContainer}>
        <Text style={styles.label}>Price Range</Text>
        <View
          style={styles.sliderContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <View style={styles.sliderTrack} />
          <View
            style={[
              styles.sliderThumb,
              { left: `${(priceRange[0] / 100) * 100}%` },
            ]}
          />
        </View>
        <Text>${priceRange[0]}</Text>
      </View>
      <View >
          <View>
            <Text style={styles.text}>
                Facilidades
            </Text>
          </View>
          <View style={styles.botones}>
          <View >
            <TouchableOpacity
              style={styles.boton}
             >
              <Text>
                  camaras
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity 
             style={styles.boton}
            >
              <Text>
                 cargador
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
            style={styles.boton}
            >
              <Text>
                Techado
              </Text>
            </TouchableOpacity>
          </View>
          </View>
      </View>
      <View>
       <Text style={styles.text}>
        Calificacion
       </Text>
       <View style={styles.botonesCalificacion}>
         <View style={styles.botonCalifica}>
              <TouchableOpacity style={styles.botonContent}>
                    <View>
                    <EvilIcons name="star" size={24} color="yellow"/>
                    </View>
                    <View>
                        <Text>
                          5
                        </Text>
                      </View>
                </TouchableOpacity>
         </View>
         <View style={styles.botonCalifica}>
              <TouchableOpacity style={styles.botonContent}>
                    <View>
                    <EvilIcons name="star" size={24} color="yellow"/>
                    </View>
                    <View>
                        <Text>
                          4
                        </Text>
                      </View>
                </TouchableOpacity>
         </View>
         <View style={styles.botonCalifica}>
                <TouchableOpacity style={styles.botonContent}>
                      <View>
                      <EvilIcons name="star" size={24} color="yellow"/>
                      </View>
                      <View>
                          <Text>
                            3
                          </Text>
                        </View>
                  </TouchableOpacity>
         </View>
         <View style={styles.botonCalifica}>
              <TouchableOpacity style={styles.botonContent}>
                    <View>
                    <EvilIcons name="star" size={24} color="yellow"/>
                    </View>
                    <View>
                        <Text>
                          2
                        </Text>
                      </View>
                </TouchableOpacity>
            </View>
         <View style={styles.botonCalifica}>
           <TouchableOpacity style={styles.botonContent}>
              <View>
              <EvilIcons name="star" size={24} color="yellow"/>
              </View>
              <View>
                  <Text>
                    1
                  </Text>
                </View>
           </TouchableOpacity>
         </View>
       </View>
      </View>
      <View>
       <Text style={styles.text}>
        Distancia
       </Text>
      </View>
      <View style={{alignItems:'flex-end',flexDirection:'row', justifyContent:'center'  }}>
       <TouchableOpacity
        style={styles.botonBottom}
       >
        <Text>
          Aplicar
        </Text>
       </TouchableOpacity>
       <TouchableOpacity
        style={styles.botonBottom}
        >
        <Text>
          Eliminar
        </Text>
       </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  priceRangeContainer: {
    flexDirection:'column',
    marginTop:20,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  sliderTrack: {
    flex: 1,
    backgroundColor: '#fb0e0e',
    borderRadius: 5,
  },
  sliderThumb: {
    position: 'absolute',
    top: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#fb0e0e',
  },
  boton:{
   width:80,
   height:40,
   backgroundColor: 'white',
   borderColor:'#fb0e0e',
   justifyContent:'center',
   alignItems:'center',
   borderRadius:5,
   borderWidth: 2
  },
  botonCalifica:{
    width:60,
    height:40,
    backgroundColor: 'white',
    borderColor:'#fb0e0e',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    borderWidth: 2
   },
   botonContent:{
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'row'

   },
  botones:{
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  botonesCalificacion:{
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  botonBottom:{
    width:80,
    height:40,
    backgroundColor: 'white',
    borderColor:'#fb0e0e',
    justifyContent:'center',
    alignItems:'center',
    
    borderRadius:5,
    borderWidth: 2
   },
  text:{
    fontWeight:'bold',
    fontSize:15
  }

});

export default SearchBarFilterScreen;
