import React, {useEffect} from 'react';
import { View, Text,StyleSheet, ScrollView, Image } from 'react-native';
import Card from '../../shared/card'


import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

const FindFunActivity = ({data,image,profilePictures}) =>{

    useEffect(() => {
        // console.log('Logging profiles: ',profilePictures[1])
        // console.log("Images are: ", image[1]);
    })

    
    return(
        <View>
            <ScrollView>

           {data.map((item, key)=>(  
                    <Card key={key}>  
                             <View style={styles.cardImageFirst}><Image source= {{uri: profilePictures[key]}}  style={styles.profilePic} /><Text style={{...styles.txtUser,...styles.addMarginUser}}>{item.user}</Text></View>
                             <View style={{alignSelf:'center'}}><Text style={styles.txtTitle}>{item.title}</Text></View>
                             <View style={styles.cardFirstLine}><Text style={styles.txt}>{item.location}</Text></View>
                             <View><Text style={styles.txt}>{item.datePosted}</Text></View>
                             <View style={styles.cardImage}><Image source= {{uri: image[key]}}  style={styles.imageFire} /></View>
                             <View><Text style={styles.txt}>{item.description}</Text></View>
                             <View><Text style={styles.txt}>{item.eventDate}</Text></View>
                             <View><Text style={styles.txt}>{item.comments}</Text></View>   

                               <View style={styles.ad}><AdMobBanner
                                    style={styles.bottomBanner}
                                    bannerSize="smartBannerPortrait"
                                    adUnitID="ca-app-pub-3162403518854486/3285357598"/></View> 

                                    {/*    ca-app-pub-3162403518854486/3285357598         */}
                    </Card> 
          
               ))}
            </ScrollView>
        </View>
        )
    }

const styles = StyleSheet.create({
    cardFirstLine:{
        padding: 5,
        flexDirection:'row',
        alignSelf:'center',
    },
    cardImage:{
        margin:20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        width: '88%',
        height:400,
        
    },
    imageFire:{
        width:'100%',
        height:'100%',
    },
    cardImageFirst:{
        padding: 5,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
    },
    profilePic:{
        width:40,
        height:40,
        borderRadius:400/2,
        borderWidth: StyleSheet.hairlineWidth,
    },
    txt:{
        fontFamily:'Bellota-Regular',
        fontSize: 18,
        margin:10,
    },
    txtUser:{
        fontFamily:'Bellota-Bold',
        fontSize: 20,
    },
    txtTitle:{
        margin:5,
        fontFamily:'Bellota-Bold',
        fontSize: 20,
    },
    addMarginUser:{
        marginLeft: 20,
        fontFamily:'Bellota-Bold',
    },
    ad:{
        marginHorizontal: -25,
        marginVertical: 20,
    },
    bottomBanner:{
    }
})
    

export default FindFunActivity;