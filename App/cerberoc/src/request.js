import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import WifiManager from 'pavex-react-native-wifi-manager'
import axios from 'axios'

var server = "https://cerbero-thiagoaugustomartins.c9users.io:8082"
var add = server + "/addUser"
var cartao = server + "/cartao"

export default class Inserir extends Component {
  constructor(props) {
    super(props)
  }
  send() {
    WifiManager.startScan().then(res => {
      WifiManager.getScanResults().then(res => {
        // console.log(res)
        axios.post(add, {
            WIFI: res,
        }).then(resServer => {
            this.props.navigation.navigate("Wifi", {wifi: res})
            console.log("add res:", resServer)
        }).catch(err => {
            console.log("add err:", err)
            Alert.alert("", "Não conseguiu conectar o servidor")
        })
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
