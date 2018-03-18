import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

// token: cFkQ8IzlkEg:APA91bE8K95TFH6PGrWLdz2CaD_Gk3iX_8DhgeKT8QcbGO8mkdLX5dEHz9ilAALofbOfXNE30MmSpWZfpKHK69W0LyvZIZ_teLteAMQscHRWtnlreCjX5Uh5iugsazBNChR5VyuIXpbP
import WifiManager from 'pavex-react-native-wifi-manager'
import axios from 'axios'
import FCM, {NotificationActionType, FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";

var url = "https://cerbero-thiagoaugustomartins.c9users.io:8081/addUser"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // WifiManager.startScan().then(res => {
    //   WifiManager.getScanResults().then(res => {
    //     // console.log(res)
    //     axios.post(url, {
    //       WIFI: res,
    //     })
    //     .then(function (response) {
    //       console.log("response server:",response);
    //     })
    //     .catch(function (error) {
    //       console.log("response erro:",error);
    //     });
    //   })
    //   .catch(err => {
    //     console.log("err result:", err)
    //   })
    // })
    // .catch(err => {
    //   console.log("erro:", err)
    // })
    FCM.requestPermissions().then(
      ()=>console.log('granted')).catch(
        ()=>console.log('notification permission rejected'))
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      // this.setState({token: token || ""})
    });

    this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
      console.log('Notification', notif)
      if (notif.local_notification) {
        return
      }
      if (notif.opened_from_tray) {
        return
      }

      if (Platform.OS === 'ios') {
              // optional
              // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              // notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData) // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break
          case NotificationType.NotificationResponse:
            notif.finish()
            break
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
            break
        }
      }
      this.showLocalNotification(notif)
    })
  }

  showLocalNotification (notif) {
    FCM.presentLocalNotification({
      body: "notif.fcm.body",
      priority: 'high',
      show_in_foreground: true,
      local: true
    })
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => {
        console.log("press")
      }} >
        <View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
});