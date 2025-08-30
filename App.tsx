import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import GuestFilterScreen from './src/screens/GuestFilterScreen';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const Stack = createStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} menuItems={menuItems} addMenuItem={addMenuItem} />}
        </Stack.Screen>
        <Stack.Screen name="AddItem">
          {(props) => <AddItemScreen {...props} addMenuItem={addMenuItem} />}
        </Stack.Screen>
        <Stack.Screen name="GuestFilter">
          {(props) => <GuestFilterScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}