import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import AddNote from './src/screens/AddNote';
import { NotesProvider } from './src/data/NotesContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ 
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="AddNote" 
            component={AddNote}
            options={{ 
              title: 'Ajouter une note',
              headerStyle: {
                backgroundColor: '#030b17ff', fontsize:30,paddingBottom:40
              },
              headerTintColor: '#d4d3d3ff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}