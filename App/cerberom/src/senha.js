import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import WifiManager from 'pavex-react-native-wifi-manager'
import axios from 'axios'

var server = "https://cerbero-thiagoaugustomartins.c9users.io:8081"
var add = server + "/addUser"
var cartao = server + "/cartao"

export default class Inserir extends Component {
    
    state = {
        senha: ''
    }

    constructor(props) {
        super(props)
    }

  componentWillMount() {
    //   var self = this
    // axios.post(add, {
    //     // WIFI: this.props.navigation.state.params.wifi,
    //     cartao: "452623.1234"
    // })
    // .then(function (response) {
    //     console.log("response server:",response);
    //     setTimeout(()=>{
    //         self.setState({user: false})
    //     }, 1000)

    //     if(response.user) {
    //         axios.post(add, {
    //             WIFI: this.props.navigation.state.params.wifi
    //         }).then(res => {
    //             console.log("add res:", res)
    //         }).catch(err => {
    //             console.log("add err:", err)
    //         })
    //     }
    // })
    // .catch(function (error) {
    //     console.log("response erro:",error);
    // });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f6f6f6"
      }} >
        <TextInput
            style={{
                marginTop: 180,
                marginHorizontal: 30,
                fontSize: 20,
            }}
            onChangeText={(senha) => this.setState({senha})}
            value={this.state.senha}
            secureTextEntry={true}
            placeholder={"Senha"}
        />
        <TouchableOpacity onPress={() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Inserir' })],
              });
              this.props.navigation.dispatch(resetAction);
        }} 
        style={{
            paddingVertical: 5,
            backgroundColor: "#a0c95f",
            width: 180,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
            marginTop: 15
        }}>
            <Text style={{
                color: "white",
                fontSize: 20,
            }}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
