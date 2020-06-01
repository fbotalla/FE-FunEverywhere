import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import About from '../screens/Account/About'
import MyInfo from '../screens/Account/myInfo'
import MyPosts from '../screens/Account/myPosts'


const Tab = createMaterialTopTabNavigator();

function myAccount() {
  return (
  
        <Tab.Navigator 
            initialRouteName="Feed"
            activeColor="#e91e63"
            tabBarOptions={{
                labelStyle: {fontSize:12, color:"#faa19b"},
                tabStyle: {height:65, justifyContent: "flex-end"},
            }}>
               
                <Tab.Screen name="My Info" component={MyInfo} />
                <Tab.Screen name="My Posts" component={MyPosts} />
                <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
   
  );
}
export default myAccount