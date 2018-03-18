import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import WifiManager from 'pavex-react-native-wifi-manager'

export default class Inserir extends Component {
  constructor(props) {
    super(props)
  }
  send() {
    WifiManager.startScan().then(res => {
      WifiManager.getScanResults().then(res => {
        this.props.navigation.navigate("Carregando", {wifi: res})
        // console.log(res)
      })
      .catch(err => {
        console.log("err result:", err)
      })
    })
    .catch(err => {
      console.log("erro:", err)
    })
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f6f6f6"
      }}>
      <TouchableOpacity onPress={() => {
          this.send()
      }}>
        <Image source={require("./assets/stone.jpeg")}
        style={{
            width: "100%",
            height: "50%",
            marginTop: "30%"
        }}/>
      </TouchableOpacity>
        <Text style={{
            fontSize: 25,
            textAlign: "center",
            marginHorizontal: "10%",
            marginTop: "5%"
        }}>Insera ou passe o cartão para iniciar uma venda.</Text>
      </View>
    );
  }
}
