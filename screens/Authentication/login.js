// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'

import firebase from '../../shared/firebase'
import Button from '../../shared/button'


export default class Login extends React.Component {
   state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email.replace(/\s+/g, ''), password)
      .then(() => this.props.navigation.navigate('Navigator'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
       <View style={{flexDirection:'row'}}><Text style={{ fontFamily: "LakkiReddy-Regular",fontSize: 43, color: '#faa19b' }}>Fun</Text><Text style={{ fontFamily: "LakkiReddy-Regular", fontSize: 43, color: '#a3def0' }}>Everywhere</Text></View>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}                                                                                                                                                        
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleLogin}>Login</Button>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}
          style= {{marginTop:15}}
        ><Text style={{fontFamily: 'Bellota-Regular'}}>Don't have an account? <Text style={{color: '#faa19b', fontFamily:'Bellota-Regular'}}>Sign up</Text></Text></TouchableOpacity>
      </View>
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