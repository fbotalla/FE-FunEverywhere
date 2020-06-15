import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet} from 'react-native';
import FindFunEvent from '../screens/Find/findFunEvent'
import FindFunActivity from '../screens/Find/findFunActivity'

const Tab = createMaterialTopTabNavigator();

function PostFun({route,navigation}) {
    const { data } = route.params;
    //console.log(data);
  return (
         <Tab.Navigator 
            initialRouteName="Feed"
            activeColor="#e91e63"
            tabBarOptions={{
                labelStyle: {fontSize:12, color:"#faa19b"},
                tabStyle: {height:65, justifyContent: "flex-end"},
            }}
            style={styles.header}>
            <Tab.Screen name="Activity" component={() => <FindFunActivity data={data.arrActivities} image={data.funImage} profilePictures={data.profilePicture} />} />
            <Tab.Screen name="Event" component={() => <FindFunEvent data={data.arrEvents} profilePictureEvent={data.profilePictureEvent} />} />
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