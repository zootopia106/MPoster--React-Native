/**
 * this is the sign up form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native'
import { getColor } from '../config'
import * as Animatable from 'react-native-animatable'

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      signUpSuccess: false
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'

    const errorMessage = this.state.errMsg ?
      <Text style={styles.errMsg}>{this.state.errMsg}</Text>
    : null

    const signUpForm = this.state.signUpSuccess ?
      null
    :
      <View>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Your Email'
          placeholderTextColor='rgba(255,255,255,.6)'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Choose Password'
          secureTextEntry={true}
          placeholderTextColor='rgba(255,255,255,.6)'
          />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleSignUp.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'Let\'s Go'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    return (
      <Animatable.View
      animation={animation}
      style={styles.container}
      onAnimationEnd={this._handleAnimEnd.bind(this)}>
        <Text style={styles.title}>Sign Up</Text>
        {errorMessage}
        {signUpForm}
      </Animatable.View>
    )
  }

  _handleSignUp() {
    this.setState({errMsg: 'Signing Up...'})
    setTimeout( () => {
      this.setState({
        errMsg: 'Thank you for signing up. An email has been send to your account for verification. Please verify your email and login to continue.',
        signUpSuccess: true
      })
    }, 2000 )
  }

  _handleGoBack() {
    this.setState({ init: false })
  }

  _handleBackBtnPress() {
    this._handleGoBack()
    return true
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromSignUp()
    }
  }

  _signUpSuccess() {
    this.setState({
      signUpSuccess: true
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)'
  },
  errMsg: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 10,
    width: 280,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: '#ffffff'
  },
  btnContainers: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280
  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor()
  }
})
