import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import FindFun from '../screens/Find/findFun'
import FindResults from './findResults'

const Tab = createStackNavigator();

function Fun() {
  return (
         <Tab.Navigator 
            initialRouteName="Feed"
            activeColor="#e91e63"
            tabBarOptions={{
                labelStyle: {fontSize:12, color:"#faa19b"},
                tabStyle: {height:65, justifyContent: "flex-end"},
            }}
            style={styles.header}>
                <Tab.Screen name="FunEverywhere" component={FindFun} options={{
                 headerTitle: () => (
                <View style={{flexDirection:'row'}}><Text style={{ fontFamily: "LakkiReddy-Regular", fontSize: 37, color: '#a3def0' }}>Fun</Text><Text style={{ fontFamily: "LakkiReddy-Regular", fontSize: 37, color: '#faa19b' }}>Everywhere</Text></View>
                  ),
                    headerTitleAlign: 'center',
                    headerTintColor: '#faa19b',
                    headerStyle: {
                        backgroundColor: '#ffffff',        
                    },
          }} />
                <Tab.Screen name="Results" component={FindResults} />
        </Tab.Navigator>
   
  );
}

/*******************************
 * STYLE AREA
 * 
 ********************************/
const styles = StyleSheet.create({
    header:{
      

    },
    home:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'red',
        color: 'red',
    }
})

/*******************************
 * 
 * 
 ********************************/
export default Fun