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
        this.props.navigation.navigate("Wifi", {wifi: res})
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
        backgroundColor: "#f6f6f6",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <TouchableOpacity onPress={()=>{
          this.send()
      }} 
      style={{
          flexDirection: "column",
          backgroundColor: "#a0c95f",
          alignItems: "center",
          justifyContent: "center",
        //   paddingVertical: "5%",
          borderRadius: 8
      }}>
        <Text style={{
            fontSize: 25,
            marginHorizontal: "10%",
            marginVertical: "5%"
        }}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
