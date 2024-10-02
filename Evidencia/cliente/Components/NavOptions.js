import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements';
import { useNavigation } from 'expo-router';

const data =[
    {
        id:"123",
        title:"Buscar Estacionamiento",
        image:"https://links.papareact.com/3pn",
        screen:"MapScreen",
    },
    {
        id:"1234",
        title:"Mis Estacionamientos",
        image:"https://links.papareact.com/3pn",
        screen:"ParkingListScreen",
    },
]

const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-48`}
          >
            <View>
              <Image
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-sm font-semibold`}>{item.title}</Text>
            </View>
            
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default NavOptions

const styles = StyleSheet.create({})
