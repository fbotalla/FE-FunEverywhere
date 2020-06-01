import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Dimensions } from 'react-native';
import PostActivity from '../screens/Post/postActivity'
import PostEvent from '../screens/Post/postEvent'

const Tab = createMaterialTopTabNavigator();

function PostFun() {
  return (
  
         <Tab.Navigator 
            initialRouteName="Feed"
            activeColor="#e91e63"
            tabBarOptions={{
                labelStyle: {fontSize:12, color:"#faa19b"},
                tabStyle: {height:65, justifyContent: "flex-end"},
            }}
            style={styles.header}>
                <Tab.Screen name="Activty" component={PostActivity} />
                <Tab.Screen name="Event" component={PostEvent} />
        </Tab.Navigator>
   
  );
}

/*******************************
 * STYLE AREA
 * 
 ********************************/
const styles = StyleSheet.create({
    header:{
        
    }
})

/*******************************
 * 
 * 
 ********************************/
export default PostFun