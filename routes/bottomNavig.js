import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
//import Homepage from '../screens/homepage'
import Fun from './fun'
import PostFun from './postFun'
import MyAccount from './myAccount'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>

      
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#faa19b"
        inactiveColor= '#a3def0'
        barStyle={{ backgroundColor: '#000000' }}
        >
      

        <Tab.Screen name="Find Fun" component={Fun}
           options={{
            tabBarLabel: 'Find Fun',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="comment-search" color={color} size={26} />
            ),
          }}/>


          
        <Tab.Screen name="Post Fun" component={PostFun}
           options={{
            tabBarLabel: 'Post Fun',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="comment-text" color={color} size={26} />
            ),
          }}/>

        <Tab.Screen name="Account" component={MyAccount}
           options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;