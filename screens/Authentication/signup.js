// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity, Alert,ScrollView } from 'react-native'
import firebase from '../../shared/firebase'
import Button from '../../shared/button'





export default class SignUp extends React.Component {
    state = { email: '',passwordConfirm:'', password: '', userName: '', errorMessage: null }
   
    
  handleSignUp = () => {    
    if(this.state.passwordConfirm === this.state.password){ 
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((userInfo) =>{ 
        userInfo.user.updateProfile({displayName: this.state.userName}).then(firebase.auth().currentUser.reload()).then((s) => {this.props.navigation.navigate('Navigator')})
    })
      .catch(error => this.setState({ errorMessage: error.message }))
  }else{
    Alert.alert(
      'Error',
      'Passwords are not matching'
    )
  }
  }
    
    
render() {
    return (
      <ScrollView  contentContainerStyle={styles.container}>
       <View style={{flexDirection:'row'}}><Text style={{ fontFamily: "LakkiReddy-Regular", fontSize: 43, color: '#a3def0' }}>Fun</Text><Text style={{ fontFamily: "LakkiReddy-Regular", fontSize: 43, color: '#faa19b' }}>Everywhere</Text></View>
        {this.state.errorMessage && 
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="UserName"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={userName => this.setState({ userName })}
          value={this.state.userName}
        />  
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
         <TextInput
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          value={this.state.passwordConfirm}
        />
        <Button title="Sign Up" onPress={this.handleSignUp}>Sign up</Button>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style= {{marginTop:15}}
        ><Text style={{fontFamily: 'Bellota-Regular'}}>Already have an account? <Text style={{color: '#faa19b', fontFamily:'Bellota-Regular'}}>Login</Text></Text></TouchableOpacity>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 12,
    padding:10,
    borderRadius: 20,
    fontFamily: 'Bellota-Regular'
  }
})