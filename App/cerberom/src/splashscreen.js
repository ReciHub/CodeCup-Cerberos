import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import WifiManager from 'pavex-react-native-wifi-manager'
import axios from 'axios'

var server = "https://cerbero-thiagoaugustomartins.c9users.io:8082"
var add = server + "/addMachine"
var cartao = server + "/cartao"

export default class Inserir extends Component {
    
    state = {
        senha: ''
    }

    constructor(props) {
        super(props)
    }

  componentWillMount() {
      var self = this
    setTimeout(()=> {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Inserir' })],
          });
        self.props.navigation.dispatch(resetAction);
    }, 3000)
  }

  render() {
    //   console.log(this.props)
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f6f6f6",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }} >
      <Image source={require('./assets/tela.png')} style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff"
        //   tintColor: "#000000",
        //   marginTop: 60
      }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
