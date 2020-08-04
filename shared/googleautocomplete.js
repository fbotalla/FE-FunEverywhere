import React from 'react'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GoogleAutocomplete = (props) =>{
    return(
    <GooglePlacesAutocomplete
            placeholder={props.placeholder} 
            minLength={2}
            value = {props.value}
            keyboardAppearance={'light'}
            autoFocus = {false}
            fetchDetails={true} 
            onPress = {props.onPress}
            ref={(instance) => {global.googlePlacesAutocomplete = instance}}
            onFocus={props.onFocus}
            setAddressText= {props.setAddressText}
           
            query={{
                key: 'AIzaSyBE6o4q1zgiT5TljqdRlpARPSsmKGe9VkQ',
                language: 'en', // language of the results
                }}
            styles={{
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)', 
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                    paddingLeft: 50,
                    paddingRight: 50,
                    },
                loader:{
                    height:100,
                },
                textInput: {
                    fontSize: 16,
                    fontFamily:'Bellota-Regular'
                    },
                }}/>
    )
}

export default GoogleAutocomplete;