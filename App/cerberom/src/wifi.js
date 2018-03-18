import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { NavigationActions } from 'react-navigation';

export default class Inserir extends Component {
  constructor(props) {
    super(props)
  }
  _rede(item, index) {
      return <View style={{
          backgroundColor: index%2==0? "#d2d2d2":"#ffffff",
          paddingHorizontal: 10,
          paddingVertical: 10
      }}>
        <Text style={styles.text}>Nome: {item.SSID}</Text>
        <Text style={styles.text}>Endereço MAC: {item.BSSID}</Text>
        <View style={{
            flexDirection: "row",
            marginVertical: 5
        }}>
            <Text>RSSI: {item.rssi},</Text>
            <Text style={styles.text2}>Level: {item.level},</Text>
            <Text style={styles.text2}>Frequência: {item.frequency}</Text>
        </View>
      </View>
  }

  _sair(self) {
      return <TouchableOpacity onPress={() => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Inserir' })],
          });
          self.props.navigation.dispatch(resetAction);
      }} style={{
        paddingVertical: 5,
        backgroundColor: "#a0c95f",
        width: 120,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginVertical: 30,

      }} >
          <Text style={{
              color: "white",
              fontSize: 25,
          }}>Sair</Text>
      </TouchableOpacity>
  }
  render() {
    return (
      <View style={{
        flex: 1,
      }} >
        {/* <Text>lista wifi</Text> */}
        <FlatList
            data={this.props.navigation.state.params.wifi}
            renderItem={({item, index}) => this._rede(item, index)}
            keyExtractor={(item) => item.BSSID}
            ListFooterComponent={() => this._sair.bind()(this)}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17
    },
    text2: {
        marginLeft: 10
    }
});
