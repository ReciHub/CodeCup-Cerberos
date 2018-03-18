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

var server = "https://cerbero-thiagoaugustomartins.c9users.io:8082"
var add = server + "/addUser"
var cartao = server + "/cartao"

export default class Inserir extends Component {
    
    state = {
        user: 0
    }

    constructor(props) {
    super(props)
  }

  componentWillMount() {
      var self = this
    // axios.post(add, {
    //     // WIFI: this.props.navigation.state.params.wifi,
    //     cartao: "452623.1234"
    // })
    // .then(function (response) {
    //     console.log("response server:",response);
        setTimeout(()=>{
            self.setState({user: 1})
            setTimeout(()=>{
                self.setState({user: 2})
            },3000)
        }, 1500)

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
            marginTop: "-40%",
            color: "#424242"
        }}>Processando...</Text>
        {this.state.user == 1 && <View>
        <Text style={{
            fontSize: 23,
            // textAlign: "center",
            marginHorizontal: "5%",
            marginTop: "7%",
            color: "#424242"
        }}>Deseja conhecer o Cérbero antifraude?
        <Text style={{
            fontSize: 14,
        }}>  Atravez da localização indor validamos suas compras e contamos com uma assistente virtual para lhe auxiliar nas suas compras
        </Text>
        </Text>
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
            marginTop: 40,
            marginBottom: 60,
        }}>
            <Text style={{
                color: "white",
                fontSize: 20,
            }}>Conhecer</Text>
        </TouchableOpacity>
        <Text style={{
            fontSize: 14,
            marginHorizontal: "5%",
            alignSelf: "center",
        }}>Se você já é cliente Cérbero aguarde um momento.</Text>
        </View>}
        {this.state.user == 2 && <View>
            <Text style={{
                fontSize: 18,
                marginTop: 30,
                marginBottom: 30,
                marginHorizontal: "5%"
            }}>
                Deseja adicionar este cartão a sua conta Cérberos?
            </Text>
            <TouchableOpacity onPress={() => {
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [NavigationActions.navigate({ routeName: 'Inserir' })],
            //   });
            //   this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Senha", {wifi: this.props.navigation.state.params.wifi})
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
