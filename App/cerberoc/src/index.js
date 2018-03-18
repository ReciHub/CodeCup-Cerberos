import React from 'react'

import {
    StackNavigator
} from 'react-navigation'

import Request from './request'
import Wifi from './wifi'

const Stack = StackNavigator({
    Request: {
        screen: Request
    },
    Wifi: {
        screen: Wifi
    },
}, {
    headerMode: "none"
})

export default Stack