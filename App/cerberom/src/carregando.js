import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import WifiManager from 'pavex-react-native-wifi-manager'
import axios from 'axios'

var server = "https://cerbero-thiagoaugustomartins.c9users.io:8081"
var add = server + "/addUser"
var cartao = server + "/cartao"

export default class Inserir extends Component {
    
    state = {
        user: true
    }

    constructor(props) {
    super(props)
  }

  componentWillMount() {
      var self = this
    axios.post(add, {
        // WIFI: this.props.navigation.state.params.wifi,
        cartao: "452623.1234"
    })
    .then(function (response) {
        console.log("response server:",response);
        setTimeout(()=>{
            self.setState({user: false})
        }, 1000)

        if(response.user) {
            axios.post(add, {
                WIFI: this.props.navigation.state.params.wifi
            }).then(res => {
                console.log("add res:", res)
            }).catch(err => {
                console.log("add err:", err)
            })
        }
    })
    .catch(function (error) {
        console.log("response erro:",error);
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f6f6f6"
      }}>
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate("Wifi", {wifi: this.props.navigation.state.params.wifi})
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
            marginTop: "-20%",
            color: "#424242"
        }}>Processando...</Text>
        {!this.state.user && <View>
            <View style={{
            width: "95%",
            alignSelf: "center",
            height: 1,
            backgroundColor: "#c0c0c0",
            marginVertical: "4%"
        }}/>
        <Text style={{
            fontSize: 25,
            textAlign: "center",
            marginHorizontal: "5%",
            // marginTop: "10%",
            color: "#424242"
        }}>Deseja conhecer o Cérbero antifraude?</Text>
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
            }}>Conhecer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'Inserir' })],
            //   });
            //   this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Senha")
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
            }}>Adicionar cartão</Text>
        </TouchableOpacity>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
