import React from 'react';
import Navigator from './bottomNavig'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Loading from '../screens/Authentication/loading'
import SignUp from '../screens/Authentication/signup'
import Login from '../screens/Authentication/login'



const Navig = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Navigator
  },
  {
    initialRouteName: 'Loading'
  }
))

export default Navig;