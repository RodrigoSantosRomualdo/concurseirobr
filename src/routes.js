/*

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Concurso() {
  return (
    <View>
      <Text>PADRAO INCIO</Text>
    </View>
  )
}

const style = StyleSheet.create({

});

*/
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home';
import Concurso from './pages/Concurso';
import Emprego from './pages/Emprego';
import StatusConcursos from './pages/StatusConcursos';

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Inicio'
        }}
      />

      <Drawer.Screen
        name='Concurso'
        component={Concurso}
        options={{
          title: 'Questões de Concursos'
        }}
      />

      <Drawer.Screen
        name='StatusConcursos'
        component={StatusConcursos}
        options={{
          title: 'Status dos Concursos'
        }}
      />

      <Drawer.Screen
        name='Emprego'
        component={Emprego}
        options={{
          title: 'Vagas de Emprego'
        }}
      />
    </Drawer.Navigator>
  )
}

export default Routes;