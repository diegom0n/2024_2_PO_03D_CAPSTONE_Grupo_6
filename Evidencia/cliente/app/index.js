import React from "react";
import "expo-router/entry";
import { Provider } from "react-redux";
import { store } from "../store";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NewCarScreen from "../screens/NewCarScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectParkingScreen from '../screens/SelectParkingScreen';
import SearchBarFilterScreen from "../screens/SearchBarFilterScreen";
import PaymentSuccessfulScreen from "../screens/PaymentSuccessfulScreen";
import { initializeStripe } from "../stripe";
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_APIKEY } from '@env';
import FormScreen from "../screens/FormScreen";
import ParkingListScreen from "../screens/ParkingListScreen";
import ProfileScreen from "../screens/ProfileScreen";
initializeStripe();

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    < StripeProvider 
           publishableKey={STRIPE_APIKEY}
           urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
           merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
     >
       <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='NewCarScreen'
            component={NewCarScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
           <Stack.Screen
            name='SelectParkingScreen'
            component={SelectParkingScreen}
            options={{
              headerShown: false,
            }}
            independent={true}
          />
          <Stack.Screen
            name='SearchBarFilterScreen'
            component={SearchBarFilterScreen}
            options={{
              headerShown: false,
            }}
          />
         
          <Stack.Screen
            name='PaymentSuccessfulScreen'
            component={PaymentSuccessfulScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='FormScreen'
            component={FormScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='ParkingListScreen'
            component={ParkingListScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
   
           </Provider>
    </StripeProvider>
  
  );
}
