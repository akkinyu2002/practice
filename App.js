import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionsProvider } from './src/context/TransactionsContext';
import Dashboard from './src/screens/Dashboard';
import Activity from './src/screens/Activity';
import AddTransaction from './src/screens/AddTransaction';
import Reports from './src/screens/Reports';
import Settings from './src/screens/Settings';
import TransactionDetails from './src/screens/TransactionDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs(){
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let name = 'circle';
          if(route.name === 'Dashboard') name = 'view-dashboard-outline';
          if(route.name === 'Activity') name = 'history';
          if(route.name === 'Add') name = 'plus-circle-outline';
          if(route.name === 'Reports') name = 'chart-box-outline';
          if(route.name === 'Settings') name = 'cog-outline';
          return <MaterialCommunityIcons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#06b6d4',
        tabBarStyle: { height: 64, paddingBottom:8, paddingTop:8 }
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Activity" component={Activity} options={{ title: 'Activity' }} />
      <Tab.Screen name="Add" component={AddTransaction} options={{ title: 'Add' }} />
      <Tab.Screen name="Reports" component={Reports} options={{ title: 'Reports' }} />
      <Tab.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default function App(){
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <TransactionsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionsProvider>
    </GestureHandlerRootView>
  );
}
