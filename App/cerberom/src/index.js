import React from 'react'

import {
    StackNavigator
} from 'react-navigation'

import Inserir from './inserir'
import SplashScreen from './splashscreen'
import Carregando from './carregando'
import Wifi from './wifi'
import Senha from './senha'

const Stack = StackNavigator({
    Inserir: {
        screen: Inserir
    },
    Carregando: {
        screen: Carregando
    },
    Wifi: {
        screen: Wifi
    },
    Senha: {
        screen: Senha
    }
}, {
    headerMode: "none"
})

export default Stack